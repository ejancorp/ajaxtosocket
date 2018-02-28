/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';
import Poll from '../../../src/Modules/Poll';

chai.use(sinonChai);

describe('Poll Test', () => {
  const interval = 2000;
  const timer = sinon.useFakeTimers();
  const methodStub = sinon.stub().returns({ result: true });
  const callbackStub = sinon.stub();
  let module = null;

  before(() => {
    module = new Poll(methodStub, callbackStub, interval);
  });

  afterEach(() => {
    timer.restore();
  });

  describe('#start', () => {
    it('should start the method polling', () => {
      const method = module.start();
      expect(method).to.be.an('Object');

      timer.tick(interval);
      expect(methodStub).to.be.calledOnce;
    });
  });
});
