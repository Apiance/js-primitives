import {describe,expect, it} from 'vitest';
import Trade from './Trade.js';

describe('Trade', function suite(){
  let trade;
  const data = {
    exchange: 'BINANCE',
    symbol: 'ETHBTC',
    id: '185404189',
    rate: '0.03425800',
    quantity: '3.32600000',
    side: 'SELL',
    buyOrderId: '837536680',
    sellOrderId: '837536822',
    timestamp: 1596417191996
};
  const data2 = {
    exchange: 'BINANCE',
    symbol: 'ETHBTC',
    timestamp: '1596417191996',
    id: '185404189',
    rate: '0.03425800',
    quantity: '3.32600000',
    side: 'SELL',
    buyOrderId: '837536680',
    sellOrderId: '837536822'
  };

  it('should instantiates', ()=>{
    trade = new Trade();
    expect(trade).to.exist;
  })
  it('should init from props', function () {
    const tradeProp = new Trade({
      market: 'KRAKEN::BTCUSD',
      rate: 10000,
      quantity: 1,
      timestamp: 1596300000
    });
    // console.log(tradeProp);
    // console.log(tradeProp.toID());
    // console.log(tradeProp.toJSON());
    // console.log(tradeProp.toCompressed());
  });
  it('should work with multiple timestamp format', function () {
    const trade = new Trade(data);
    const trade2 = new Trade(data2);
  });
  it('should to ZTrade', function () {
    const trade = new Trade({
      market:{
        symbol: 'BTCUSD',
        exchange: 'KRAKEN',
      },
      rate: 10000,
      quantity: 1,
      timestamp: 1596300000
    });
    const ztrade = trade.toZTrade();
    expect(ztrade.toString()).to.equal('Z::KRAKEN::BTCUSD::2020-08-01T16:40:00.000Z::TB0DEBCC5::10000::1::-1::null::null');
  });
});
