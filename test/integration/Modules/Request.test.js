/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import Request from '../../../src/Modules/Request';

describe('Request Test', () => {
  describe('#get', () => {
    it('should return the requested data', (done) => {
      Request.get('https://jsonplaceholder.typicode.com/posts').then((result) => {
        expect(result).to.be.not.empty;
      }).then(done, done);
    });

    it('should return an error if the address returns an error', (done) => {
      Request.get('https://httpbin.org/hidden-basic-auth/user/passwd').catch((result) => {
        expect(result).to.be.an('Error').that.is.not.empty;
      }).then(done, done);
    });
  });
});
