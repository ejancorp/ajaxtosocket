import got from 'got';

/**
 * @class Request
 */
class Request {
  /**
   * Create get request to specific URL
   * @method get
   * @param  {String} url
   * @return {Promise<Object>}
   */
  static get(url = '') {
    return new Promise((resolve, reject) => got(url.toString())
      .then(response => resolve(response))
      .catch(error => reject(error)));
  }
}

export default Request;
