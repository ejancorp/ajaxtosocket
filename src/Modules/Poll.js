import Promisify from './Promisify';

/**
 * @class Poll
 */
class Poll {
  /**
   * Create poll instance class
   * @method constructor
   * @param  {Function}    [method=() => {}]
   * @param  {Number}    [interval=0]
   */
  constructor(method = () => {}, callback = () => {}, interval = 0) {
    this.poll = null;
    this.callback = callback;
    this.method = Promisify(method);
    this.interval = interval;
  }

  /**
   * Start the polling
   * @method start
   * @return {Object}
   */
  start() {
    this.poll = setTimeout(
      () => this.method()
        .then(result => this.callback(result, null))
        .catch(error => this.callback(null, error)),
      this.interval,
    );

    return this;
  }

  /**
   * Stop the polling
   * @method stop
   * @return {Object}
   */
  stop() {
    this.poll = clearTimeout(this.poll);

    return this;
  }
}

export default Poll;
