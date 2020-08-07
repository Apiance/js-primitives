const { expect } = require('chai');
const ZCandle = require('./ZCandle');
const Candle = require('../Candle/Candle');

describe('ZCandle', function suite(){
  const zippedCandleStr = 'C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::10000::10111::10000::10100::42';
  const candle = new Candle({
    exchange: 'KRAKEN',
    symbol: 'BTCUSD',
    timeframe: '1d',
    timestamp: '2020-08-02T00:00:00.000Z',
    open:'10000',
    high:'10111',
    low: '10000',
    close: '10100',
    volume: '42',
  });
  it('should instantiates', ()=>{
    zcandle = new ZCandle();
    expect(zcandle).to.exist;
  })
  it('should init from candle', function () {
    const zcandle = new ZCandle(candle);
    expect(zcandle.toString()).to.equal(zippedCandleStr);
  });
  it('should init from zipped', function () {
    const zcandle = new ZCandle(zippedCandleStr);
    expect(zcandle.toString()).to.equal(zippedCandleStr);
  });
  it('should convert to trade', function () {
    const zcandle = new ZCandle(zippedCandleStr);
    expect(zcandle.toCandle()).to.deep.equal(candle);
  });
  it('should create from candle', function () {
    const zcandle = new ZCandle(zippedCandleStr);
    const candle = zcandle.toCandle();

    expect(new ZCandle(candle)).to.deep.equal(zcandle);
    console.log(zcandle);
  });
  it('should clone', function () {
    const zcandle = new ZCandle(zippedCandleStr);
    const zcandle1 = new ZCandle(zcandle);
  });
});
