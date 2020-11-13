const {expect} = require('chai');
const SocketMessage = require('./SocketMessage');
describe('SocketMessage', function suite() {
  const payload = {
      channel: 'candles',
      exchange: 'BINANCE',
      symbol: 'BTCUSD',
      interval: '1d'
  }
  let socket;
  it('should instantiates with now as default', () => {
    const socketDefault = new SocketMessage();
    expect(socketDefault).to.exist;
  });
  it('should init from params', function () {
    socket = new SocketMessage(SocketMessage.ACTIONS.SUBSCRIBE, payload);
    expect(socket.action).to.deep.equal(SocketMessage.ACTIONS.SUBSCRIBE);
    expect(socket.payload).to.deep.equal(payload);
  });
  it('should export to JSON', function () {
    const json = socket.toJSON();
    expect(json).to.deep.equal({
      action: 'SUBSCRIBE',
      payload,
    });
  });
});
