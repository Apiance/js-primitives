const { expect } = require('chai');
const Trade = require('./Trade');

describe('Trade', function suite(){
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
});
