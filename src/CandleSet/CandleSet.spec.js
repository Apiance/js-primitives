const { expect } = require('chai');
const Candle = require('../Candle/Candle');
const CandleSet = require('./CandleSet');

describe('Candle', function suite(){
  const opts1 = {
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
  const opts2 = {
    exchange: "KRAKEN",
    symbol: "BTCUSD",
    timeframe: '1d',
    timestamp: '2020-08-03T00:00:00.142Z',
    open: '10100',
    close: '10200',
    high: '10330',
    low: '10111',
    volume: '38'
  }
  const opts3 = {
    exchange: "KRAKEN",
    symbol: "BTCUSD",
    timeframe: '1d',
    timestamp: '2020-08-01T00:00:00.142Z',
    open: '10100',
    close: '10000',
    high: '10200',
    low: '10000',
    volume: '11'
  }

  let candleSet;
  it('should instantiates with now as default', ()=>{
    const candleSetDefault = new CandleSet();
    expect(candleSetDefault).to.exist;
  })
  it('should instantiate from array', function () {
    const candleSetFromArray = new CandleSet([]);
    console.log({candleSetFromArray});
  });
  it('should insert candle', function () {
    candleSet = new CandleSet();
    candleSet.insert(new Candle(opts1));
    candleSet.insert(new Candle(opts2));
    candleSet.insert(new Candle(opts3));
    console.log(candleSet.candles)

  });

});
