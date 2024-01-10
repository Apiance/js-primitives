const {expect} = require('chai');
const Trade = require('../Trade');
const computeTradeId = require('./computeTradeId');
describe('computeTradeId', function suite() {
  it('should compute', function () {
    const trade = new Trade({
      market:{
        symbol: 'BTCUSD',
        exchange: 'KRAKEN',
      },
      rate: 10000,
      quantity: 1,
      timestamp: 1596300000
    });

    expect(computeTradeId(trade)).to.equal('TE22B0B957EA5');
  });
});
