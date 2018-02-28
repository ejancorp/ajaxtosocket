import http from 'http';
import socketio from 'socket.io';
import Poll from './Modules/Poll';
import Request from './Modules/Request';

class AjaxToPoll {
  // const method = Request.get.bind(null, 'https://api.fixer.io/latest');
  // const App = new Poll(method, (result) => {
  //   console.log(result);
  // }, 3000);
  //
  // App.start();
}

export default AjaxToPoll;
