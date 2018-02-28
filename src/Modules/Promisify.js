/**
 * Promisify a method
 * @method
 * @param  {Function} method
 * @return {Function}
 */
export default function (method) {
  return () => new Promise(resolve => resolve(method()));
}
