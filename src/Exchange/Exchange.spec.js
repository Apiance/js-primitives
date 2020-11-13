const {expect} = require('chai');
const Exchange = require('./Exchange');

describe('Exchange', function suite() {
  let exchange;
  it('should instantiates with now as default', () => {
    const exchangeDefault = new Exchange();
    expect(exchangeDefault).to.exist;
    expect(exchangeDefault.name).to.equal('UnnamedExchange');
  });
  it('should init from params', function () {
    exchange = new Exchange({
      name: "Binance"
    });
    expect(exchange.name).to.deep.equal('Binance');

    const exchange2 = new Exchange({
      name: "Binance",
      fees:{
        many: true
      }
    });
    expect(exchange2.name).to.deep.equal('Binance');
    expect(exchange2.fees).to.deep.equal({many: true});
  });
});
