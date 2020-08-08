const { expect } = require('chai');
const Candle = require('./Candle');
const ZCandle = require('../ZCandle/ZCandle');
const Epoch = require('../Epoch/Epoch')
describe('Candle', function suite(){
  const opts = {
    exchange: "KRAKEN",
    symbol: "BTCUSD",
    timeframe: '1d',
    timestamp: '2020-08-02T00:00:00.142Z',
    open: '10000',
    close: '10100',
    high: '10111',
    low: '10000',
    volume: '42'
  }
  let candle;
  it('should instantiates with now as default', ()=>{
    const candleDefault = new Candle();
    expect(candleDefault).to.exist;
  })
  it('should init from param', function () {
    candle = new Candle(opts);
    expect(candle.market.exchange.toString()).to.equal('KRAKEN');
    expect(candle.market.symbol.toString()).to.equal('BTCUSD');
    expect(candle.open).to.equal('10000');
    expect(candle.close).to.equal('10100');
    expect(candle.high).to.equal('10111');
    expect(candle.low).to.equal('10000');
    expect(candle.timeframe).to.equal('1d');
    expect(candle.volume).to.equal('42');
    expect(candle.openTime).to.deep.equal(new Epoch('2020-08-02T00:00:00.000Z'));
    expect(candle.closeTime).to.deep.equal(new Epoch('2020-08-02T23:59:59.999Z'));

    expect(candle.getId()).to.equal('KRAKEN/BTCUSD/1d/2020/08/02/2020-08-02T00:00:00.000Z');
  });
  it('should calculate closeTime', function () {
    const candleDay = new Candle({timeframe: '1d', openTime: opts.timestamp});
    expect(candleDay.closeTime).to.deep.equal(new Epoch('2020-08-02T23:59:59.999Z'));

    const candleHour = new Candle({timeframe: '1h', openTime: opts.timestamp});
    expect(candleHour.closeTime).to.deep.equal(new Epoch('2020-08-02T00:59:59.999Z'));

    const candleMin = new Candle({timeframe: '1m', openTime: opts.timestamp});
    expect(candleMin.closeTime).to.deep.equal(new Epoch('2020-08-02T00:00:59.999Z'));
  });
  it('should to ZCandle', function () {
    expect(candle.toZCandle()).to.deep.equal(new ZCandle('C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::10000::10111::10000::10100::42'))
  });
  it('should to compress', function () {
    expect(candle.toCompressed()).to.deep.equal('C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::10000::10111::10000::10100::42')
  });
  it('should from compressed', function () {
    const candleFromZCandle = new Candle(candle.toZCandle());
    expect(candleFromZCandle).to.deep.equal(candle);
  });
  it('should isWithinTimeframe', function () {
    candle.isWithinTimeframe(new Epoch());
    expect(candle.isWithinTimeframe(new Epoch())).to.equal(false);
    expect(candle.isWithinTimeframe(new Epoch('2020-08-02T01:00:00.000Z'))).to.equal(true);
  });
  it('should update considerNewLastPrice', function () {
    candle.considerNewLastPrice('10101', 1);
    expect(candle.close).to.equal('10101')
    expect(candle.volume).to.equal('43')
    expect(()=>candle.considerNewLastPrice(null, 1)).to.throw('Missing parameter lastPrice. Supplied: {"lastPrice":null,"amount":1}');
    candle.considerNewLastPrice(1, null);
    expect(candle.close).to.equal(1);
    expect(candle.volume).to.equal('43')
  });
  it('should toJSON', function () {
    console.log(JSON.stringify(candle));
  });
  it('should deal with trades', function () {
    const x = {
        market: "KRAKEN::BTCUSD",
        timeframe: '1d',
        openTime: '2020-08-02T00:00:00.142Z',
        closeTime: '2020-08-02T00:59:59.999Z',
        open: '10000',
        close: '10100',
        high: '10111',
        low: '10000',
        volume: '42',
        trades: 60
    };
    const fullCandle = new Candle(x);
    expect(fullCandle.toCompressed()).to.equal('C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::10000::10111::10000::10100::42::60');
  });
});
