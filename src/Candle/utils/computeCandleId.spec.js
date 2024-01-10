const {expect} = require('chai');
const Candle = require('../Candle');
const computeCandleId = require('./computeCandleId');
describe('computeTradeId', function suite() {
  it('should compute', function () {
    const candle = new Candle({
      market: {
      exchange: 'BINANCE',
          symbol: 'ETHUSDT',
      },
      interval: '1m',
          open: '1828.99000000',
        close: '1829.14000000',
        low: '1828.98000000',
        high: '1829.81000000',
      trades: '337',
          hash: '0',
        tradesIds: []
  });

    expect(computeCandleId(candle)).to.equal('C97255635BB99');
  });
});
