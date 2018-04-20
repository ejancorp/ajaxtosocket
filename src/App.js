import _ from 'lodash';
import http from 'http';
import dotenv from 'dotenv';
import socketio from 'socket.io';
import Poll from './Modules/Poll';
import Logger from './Modules/Logger';
import Request from './Modules/Request';

/**
 * @class AjaxToSocket
 */
class AjaxToSocket {
  /**
   * Create an instance of AjaxToSocket
   * @method constructor
   * @param  {Object}    [options={}] AjaxToSocket settings
   */
  constructor(options = {}) {
    this.default = { port: 3000, interval: 3000, log_callback: null };
    this.options = _.extend(this.default, options);
    this.server = http.createServer();
    this.io = socketio(this.server);
  }

  /**
   * Initialize connection and server settings
   * @method init
   */
  init() {
    this.io.on('connection', this.onConnect.bind(this));
    this.server.listen(this.options.port, this.onInit.bind(this));
  }

  /**
   * Create log on server establish
   * @method onInit
   */
  onInit() {
    this.log(`Monitor has been started on port: ${this.options.port}`);
  }

  /**
   * On client connection established
   * @method onConnect
   * @param  {Object}     socket socket object
   * @return {Mixed}
   */
  onConnect(socket) {
    const { request: { _query: query } } = socket;
    const { url = null, interval = this.options.interval } = query;
    const poll = this.poll(url, interval, socket);

    this.log(`Request Started: ${url}`);
    socket.on('disconnect', () => Promise.resolve(poll.stop()).then(this.log(`Request Ended: ${url}`)));
    return poll.start();
  }

  /**
   * Trigger emit message on response
   * @method emitResponse
   * @param  {Array}      args array of arguments
   * @param  {Mixed}      result
   */
  emitResponse(args, result) {
    const [, , socket] = args;
    socket.emit('response', result);
    this.log(`Emit Response: ${args}`);
  }

  /**
   * Create a poll instance
   * @method poll
   * @param  {Array}      args array of arguments
   * @return {Object}
   */
  poll(...args) {
    const [url, interval] = args;
    const method = Request.get.bind(null, url);
    return new Poll(method, this.emitResponse.bind(this, args), Number(interval));
  }

  /**
   * Create log message
   * @method log
   * @param  {Mixed} message message to log
   * @return {Mixed}
   */
  log(message) {
    if (!_.isFunction(this.options.log_callback)) {
      return Logger.log(message);
    }
    return this.options.log_callback.call(null, message);
  }
}

if (require.main === module) {
  dotenv.config();

  const App = new AjaxToSocket({ port: Number(process.env.APP_PORT) || 3000 });
  App.init();
}

export default AjaxToSocket;
