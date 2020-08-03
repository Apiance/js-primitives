const { expect } = require('chai');
const Candle = require('./Candle');
const Epoch = require('../Epoch/Epoch')
describe('Candle', function suite(){
  const opts = {
    exchange: "Kraken",
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
    const candle = new Candle();
    expect(candle).to.exist;
  })
  it('should init from param', function () {
    candle = new Candle(opts);

    expect(candle.market.exchange.toString()).to.equal('Kraken');
    expect(candle.market.symbol.toString()).to.equal('BTCUSD');
    expect(candle.open).to.equal('10000');
    expect(candle.close).to.equal('10100');
    expect(candle.high).to.equal('10111');
    expect(candle.low).to.equal('10000');
    expect(candle.timeframe).to.equal('1d');
    expect(candle.volume).to.equal('42');
    expect(candle.openTime).to.deep.equal(new Epoch('2020-08-02T00:00:00.000Z'));
    expect(candle.closeTime).to.deep.equal(new Epoch('2020-08-02T23:59:59.999Z'));

    expect(candle.$id).to.equal('Kraken/BTCUSD/1d/2020/08/02/2020-08-02T00:00:00.000Z');
  });
  it('should calculate closeTime', function () {
    const candleDay = new Candle({timeframe: '1d', openTime: opts.timestamp});
    expect(candleDay.closeTime).to.deep.equal(new Epoch('2020-08-02T23:59:59.999Z'));

    const candleHour = new Candle({timeframe: '1h', openTime: opts.timestamp});
    expect(candleHour.closeTime).to.deep.equal(new Epoch('2020-08-02T00:59:59.999Z'));

    const candleMin = new Candle({timeframe: '1m', openTime: opts.timestamp});
    expect(candleMin.closeTime).to.deep.equal(new Epoch('2020-08-02T00:00:59.999Z'));
  });
  it('should to compress', function () {
    expect(candle.toCompressed()).to.deep.equal('C::Kraken::BTCUSD::1d::2020-08-02T00:00:00.000Z::10000::10111::10000::10100::42')
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
  });
});
