import { expect, describe, it } from 'vitest';
import Tick from './Tick.js';
describe('Tick', function suite() {
  let ticker;
  it('should instantiates with now as default', () => {
    const tickerDefault = new Tick();
    expect(tickerDefault).to.exist;
  });
  it('should init from params', function () {
    ticker = new Tick({
      market: {
        symbol:"ABCUSD",
        exchange: 'FAKEEXCHANGE',
      }
    });
    expect(ticker.market.symbol).to.deep.equal('ABCUSD');
  });
});
