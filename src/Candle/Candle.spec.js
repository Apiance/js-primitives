const { expect } = require('chai');
const Candle = require('./Candle');
const ZCandle = require('../ZCandle/ZCandle');
const Epoch = require('../Epoch/Epoch')
describe('Candle', function suite(){
  const opts = {
    exchange: "KRAKEN",
    symbol: "BTCUSD",
    interval: '1d',
    timestamp: '2020-08-02T00:00:00.142Z',
    open: '10000',
    close: '10100',
    high: '10111',
    low: '10000',
  };
  const opts1 = {...opts}
  const opts2 = {...opts, trades: "42"}
  const opts3 = {...opts, trades: "42", volume: {base: "15"}}
  const opts4 = {...opts, trades: "42", volume: {quote: "151500", base: "15"}}
  const opts5 = {...opts, trades: "42", volume: { quote: "151500"}}
  const opts6 = {...opts, volume: { quote: "151500"}}

  let candle;
  let candle1;
  let candle2;
  let candle3;
  let candle4;
  let candle5;
  let candle6;
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
    expect(candle.interval).to.equal('1d');
    expect(candle.volume).to.deep.equal({base: null, quote: null});
    expect(candle.trades).to.deep.equal(null);
    expect(candle.openTime).to.deep.equal(new Epoch('2020-08-02T00:00:00.000Z'));
    expect(candle.closeTime).to.deep.equal(new Epoch('2020-08-02T23:59:59.999Z'));

    expect(candle.getId()).to.equal('KRAKEN/BTCUSD/1d/2020/08/02/2020-08-02T00:00:00.000Z');


     candle1 = new Candle(opts1);
     candle2 = new Candle(opts2);
     candle3 = new Candle(opts3);
     candle4 = new Candle(opts4);
     candle5 = new Candle(opts5);
     candle6 = new Candle(opts6);

  });
  it('should calculate closeTime', function () {
    const candleDay = new Candle({interval: '1d', openTime: opts.timestamp});
    expect(candleDay.closeTime).to.deep.equal(new Epoch('2020-08-02T23:59:59.999Z'));

    const candleHour = new Candle({interval: '1h', openTime: opts.timestamp});
    expect(candleHour.closeTime).to.deep.equal(new Epoch('2020-08-02T00:59:59.999Z'));

    const candleMin = new Candle({interval: '1m', openTime: opts.timestamp});
    expect(candleMin.closeTime).to.deep.equal(new Epoch('2020-08-02T00:00:59.999Z'));
  });
  it('should to ZCandle', function () {
    expect(candle.toZCandle()).to.deep.equal(new ZCandle('C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::10000::10111::10000::10100'))
  });
  it('should to compress', function () {
    expect(candle.toCompressed()).to.deep.equal('C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::10000::10111::10000::10100')
  });
  it('should from compressed', function () {
    const candleFromZCandle = new Candle(candle.toZCandle());
    expect(candleFromZCandle).to.deep.equal(candle);

    const compressed1 ='C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::10000::10111::10000::10100';
    const compressed2 = 'C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::10000::10111::10000::10100::42';
    const compressed3 = 'C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::10000::10111::10000::10100::31-42::42';
    const compressed4 = 'C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::10000::10111::10000::10100::31-::42';
    const compressed5 = 'C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::10000::10111::10000::10100::-42::42'
    expect(new Candle(compressed1).toCompressed()).to.equal(compressed1);
    expect(new Candle(compressed2).toCompressed()).to.equal(compressed2);
    expect(new Candle(compressed3).toCompressed()).to.equal(compressed3);
    expect(new Candle(compressed4).toCompressed()).to.equal(compressed4);
    expect(new Candle(compressed5).toCompressed()).to.equal(compressed5);


  });
  it('should isWithinInterval', function () {
    candle.isWithinInterval(new Epoch());
    expect(candle.isWithinInterval(new Epoch())).to.equal(false);
    expect(candle.isWithinInterval(new Epoch('2020-08-02T01:00:00.000Z'))).to.equal(true);
  });
  it('should update considerNewLastPrice', function () {
    candle.considerNewLastPrice('10101', 15, 1);
    expect(candle.close).to.equal('10101')
    expect(candle.volume).to.deep.equal({quote: "151515", base: "15"})
    expect(candle.trades).to.deep.equal('1')
    expect(()=>candle.considerNewLastPrice(null, 1)).to.throw('Missing parameter lastPrice. Supplied: {"lastPrice":null,"amount":1}');
    candle.considerNewLastPrice(1, null, null);
    expect(candle.close).to.equal('1');
    expect(candle.volume).to.deep.equal({ base: '15', quote: '151515' } )
    expect(candle.trades).to.deep.equal('1')

  });

  it('should deal with trades', function () {
    const x = {
        market: "KRAKEN::P-BTC-USD",
        interval: '1d',
        openTime: '2020-08-02T00:00:00.142Z',
        closeTime: '2020-08-02T00:59:59.999Z',
        open: '10000',
        close: '10100',
        high: '10111',
        low: '10000',
        volume: { base:'0.01', quote: '100' },
        trades: 60
    };
    const fullCandle = new Candle(x);
    expect(fullCandle.toCompressed()).to.equal('C::KRAKEN::P-BTC-USD::1d::2020-08-02T00:00:00.000Z::10000::10111::10000::10100::0.01-100::60');
  });
  it('should toCompressed', function () {
    const opts = {
      exchange: "KRAKEN",
      symbol: "BTCUSD",
      interval: '1d',
      timestamp: '2020-08-02T00:00:00.142Z',
      open: '10000',
      close: '10100',
      high: '10111',
      low: '10000',
    }

    expect(new Candle(opts).toCompressed()).to.equal('C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::10000::10111::10000::10100');
    expect(new Candle({...opts, trades: 42}).toCompressed()).to.equal('C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::10000::10111::10000::10100::42');
    expect(new Candle({...opts, trades: 42, volume: {quote:42, base: 31}}).toCompressed()).to.equal('C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::10000::10111::10000::10100::31-42::42');
    expect(new Candle({...opts, trades: 42, volume: {base: 31}}).toCompressed()).to.equal('C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::10000::10111::10000::10100::31-::42');
    expect(new Candle({...opts, trades: 42, volume: {quote:42}}).toCompressed()).to.equal('C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::10000::10111::10000::10100::-42::42');
  });
  it('should correctly translate to string numerical value', function () {
    const c = new Candle({
      market: {
          exchange: 'FTX',
          symbol: 'BTC-PERP',
      },
        interval: '10s',
        open: 19130,
        close: 19130,
        low: 19129,
        high: 19130,
        volume: { base: 0.0044, quote: 84.1717 },
        openTime: { date: '2022-10-15T18:27:00.000Z' },
        closeTime:  { date: '2022-10-15T18:27:09.999Z' },
        trades: 4
    });
    expect(c.open).to.equal('19130')
    expect(c.close).to.equal('19130')
    expect(c.low).to.equal('19129')
    expect(c.high).to.equal('19130')
    expect(c.volume.base).to.equal('0.0044')
    expect(c.volume.quote).to.equal('84.1717')
    expect(c.trades).to.equal('4')
  });
  it('should toJSON', function(){
    const c = new Candle('C::FTX::BTC-PERP::10s::2022-10-15T18:27:00.000Z::19130::19130::19129::19130::0.0044-84.1717::4');
    const json = c.toJSON();
    expect(json.market).to.deep.equal({
      exchange: 'FTX',
      type: "PERP",
      symbol: 'BTC-PERP',
      base: "BTC",
      quote: "USD",
    });
    expect(json.interval).to.deep.equal('10s');
    expect(json.open).to.deep.equal('19130');
    expect(json.close).to.deep.equal('19130');
    expect(json.low).to.deep.equal('19129');
    expect(json.high).to.deep.equal('19130');
    expect(json.volume).to.deep.equal({ base:'0.0044', quote: '84.1717' });
    expect(json.openTime).to.deep.equal({ date: '2022-10-15T18:27:00.000Z' });
    expect(json.closeTime).to.deep.equal({ date: '2022-10-15T18:27:09.999Z' });
    expect(json.trades).to.deep.equal('4');
  });
  it('should work', function () {
    const c = new Candle({market: 'FTX::BTC-PERP', interval: '10s'});
    c.considerNewLastPrice(19559, 0.34, 1);
    c.considerNewLastPrice(19560, 0.10, 1);
    c.considerNewLastPrice(19561, 0.45, 1);
    c.considerNewLastPrice(19560, 0.25, 1);
    c.considerNewLastPrice(19557, 0.25, 1);
    c.considerNewLastPrice(19564, 0.15, 1);
    c.considerNewLastPrice(19558, 1.42, 1);

    expect(c.market.toString()).to.equal('FTX::BTC-PERP');
    const json = c.toJSON();
    expect(json.market).to.deep.equal({
      exchange:'FTX',
      type: "PERP",
      base: "BTC",
      quote: "USD",
      symbol: 'BTC-PERP'
    });
    expect(json.open).to.equal('19559');
    expect(json.close).to.equal('19558');
    expect(json.low).to.equal('19557');
    expect(json.high).to.equal('19564');
  });
});
