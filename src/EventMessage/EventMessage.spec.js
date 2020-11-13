const {expect} = require('chai');
const EventMessage = require('./EventMessage');

describe('EventMessage', function suite() {
  const payload = {
    channel: 'candles',
    exchange: 'BINANCE',
    symbol: 'BTCUSD',
    interval: '1d'
  }
  const type = 'EVENT/SOMETHING';
  let event;
  it('should instantiates with now as default', () => {
    const eventDefault = new EventMessage();
    expect(eventDefault).to.exist;
  });
  it('should init from params', function () {
    event = new EventMessage(type, payload);
    expect(event.type).to.deep.equal(type);
    expect(event.payload).to.deep.equal(payload);
  });
  it('should export to JSON', function () {
    expect(event.toJSON()).to.deep.equal({
      type,
      payload,
    });
  });
});
