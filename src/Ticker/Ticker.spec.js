import { describe, it, expect } from "vitest";
import Ticker from './Ticker.js';

describe('Ticker', function suite() {
  let ticker;
  it('should instantiates with now as default', () => {
    const tickerDefault = new Ticker();
    expect(tickerDefault).to.exist;
  });
  it('should init from params', function () {
    ticker = new Ticker({
      symbol: "ABCUSD"
    });
    expect(ticker.symbol).to.deep.equal('ABCUSD');
  });
});
