const { expect } = require('chai');
const Candle = require('./Candle');

describe('Candle', function suite(){
  let candle;

  it('should instantiates with now as default', ()=>{
    const candle = new Candle();
    expect(candle).to.exist;
  })
  it('should init from param', function () {
    const candle = new Candle({
      exchange: "Binance",
      symbol: "DASHUSD",
      timeframe: '1d',
      timestamp: '2020-08-02T00:37:56.142Z'
    });

    expect(candle.$meta.id).to.equal('Binance/DASHUSD/1d/2020/08/02/2020-08-02T00:37:56.142Z');
  });

});
