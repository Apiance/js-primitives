import { expect } from 'chai';
import Command from './Command.js';
describe('Command', function suite() {
  const serviceID = 'SERVICE/NODE';
  const action = Command.ACTIONS.FETCH;
  const context = 'foobar';
  let command;
  it('should instantiates with now as default', () => {
    const commandDefault = new Command();
    expect(commandDefault).to.exist;
  });
  it('should init from params', function () {
    command = new Command(serviceID, action, context);
    expect(command.serviceID).to.deep.equal(serviceID);
    expect(command.action).to.deep.equal(action);
    expect(command.context).to.deep.equal(context);
    expect(command.opts).to.deep.equal(undefined);
  });
  it('should export to JSON', function () {
    const json = command.toJSON();
    expect(json).to.deep.equal({
      serviceID: 'SERVICE/NODE',
      action: 'FETCH',
      context: 'foobar',
    });
  });
  it('should ', function () {


    const opts = {
      // Here serviceID represents a clientID. We wanted to have a requester / requestee logic
      // And also know whom a command is directed too, while also using it as a framework for our internals.
      serviceID: '@kandlfeed/js-client@1.0.0',
      action: 'SUBSCRIBE',
      context: 'candles',
      payload: { exchange: 'BINANCE', symbol:"BTCUSD", interval: '4h' }
    }
    const cmd = new Command(opts);

  });
});
