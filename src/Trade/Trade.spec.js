const { expect } = require('chai');
const Trade = require('./Trade');

describe('Trade', function suite(){
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
}
  it('should instantiates', ()=>{
    trade = new Trade();
    expect(trade).to.exist;
  })
  it('should init from props', function () {
    const tradeProp = new Trade({
      symbol: 'BTCUSD',
      exchange: 'KRAKEN',
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
    console.log(trade);
  });
});
