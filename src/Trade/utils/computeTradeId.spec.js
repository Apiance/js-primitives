import {describe,expect, it} from 'vitest';
import Trade from '../Trade.js';
import computeTradeId from './computeTradeId.js';
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

    expect(computeTradeId(trade)).to.equal('T5C58BA58');
  });
});
