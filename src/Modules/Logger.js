/* eslint no-console: 0 */

/**
 * @class Logger
 */
class Logger {
  /**
   * Log any messages with timestamp
   * @method log
   * @param  {String|Object} message message to log
   */
  static log(message) {
    console.log(`${new Date().toUTCString()} | ${JSON.stringify(message)}`);
  }
}

export default Logger;
