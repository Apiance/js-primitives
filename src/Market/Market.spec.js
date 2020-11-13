const {expect} = require('chai');
const Market = require('./Market');

describe('Market', function suite() {
  const exchangeName = 'Binance';
  const symbol = 'DASHBTC';
  const symbol2 = 'DASH-BTC';
  const base = 'DASH';
  const quote = 'BTC';

  let market;
  let market2;
  let market3;
  let market4;
  let market5;
  it('should instantiates with now as default', () => {
    const marketDefault = new Market();
    expect(marketDefault).to.exist;
  });
  it('should init from params', function () {
    market = new Market({exchange: exchangeName, symbol})
    expect(market.exchange).to.deep.equal(exchangeName.toUpperCase());
    expect(market.symbol).to.deep.equal(symbol);
    expect(market.quote).to.deep.equal(null);
    expect(market.base).to.deep.equal(null);
    expect(market.type).to.deep.equal(null);

    market2 = new Market({exchange: exchangeName, symbol, base})
    expect(market2.exchange).to.deep.equal(exchangeName.toUpperCase());
    expect(market2.symbol).to.deep.equal(symbol);
    expect(market2.quote).to.deep.equal(quote);
    expect(market2.base).to.deep.equal(base);
    expect(market2.type).to.deep.equal(null);

    market3 = new Market({exchange: exchangeName, symbol, quote})
    expect(market3.exchange).to.deep.equal(exchangeName.toUpperCase());
    expect(market3.symbol).to.deep.equal(symbol);
    expect(market3.quote).to.deep.equal(quote);
    expect(market3.base).to.deep.equal(base);
    expect(market3.type).to.deep.equal(null);

    market4 = new Market({exchange: exchangeName, symbol, base, quote, type: 'perp'})
    expect(market4.exchange).to.deep.equal(exchangeName.toUpperCase());
    expect(market4.symbol).to.deep.equal(symbol);
    expect(market4.quote).to.deep.equal(quote);
    expect(market4.base).to.deep.equal(base);
    expect(market4.type).to.deep.equal('PERP');

    market5 = new Market({exchange: exchangeName, symbol: symbol2, base, quote, type: 'perp'})
    expect(market5.exchange).to.deep.equal(exchangeName.toUpperCase());
    expect(market5.symbol).to.deep.equal(symbol2);
    expect(market5.quote).to.deep.equal(quote);
    expect(market5.base).to.deep.equal(base);
    expect(market5.type).to.deep.equal('PERP');
  });
  it('should to JSON', function () {
    expect(market.toJSON()).to.deep.equal(market.toObject());
    expect(market.toJSON()).to.deep.equal({
          exchange: 'BINANCE',
          type: null,
          symbol: 'DASHBTC',
          quote: null,
          base: null
        }
    )
    expect(market2.toJSON()).to.deep.equal({
          exchange: 'BINANCE',
          type: null,
          symbol: 'DASHBTC',
          quote: 'BTC',
          base: "DASH"
        }
    )
    expect(market3.toJSON()).to.deep.equal(market2.toObject())
    expect(market4.toJSON()).to.deep.equal({
      exchange: 'BINANCE',
      type: "PERP",
      symbol: 'DASHBTC',
      quote: 'BTC',
      base: "DASH"
    })
    expect(market5.toJSON()).to.deep.equal({
      exchange: 'BINANCE',
      type: "PERP",
      symbol: 'DASH-BTC',
      quote: 'BTC',
      base: "DASH"
    })
  });
  it('should to compressed', function () {
    expect(market.toCompressed()).to.equal('BINANCE::DASHBTC')
    expect(market2.toCompressed()).to.equal('BINANCE::DASH-BTC')
    expect(market3.toCompressed()).to.equal('BINANCE::DASH-BTC')
    expect(market4.toCompressed()).to.equal('BINANCE::PERP-DASH-BTC')
    expect(market5.toCompressed()).to.equal('BINANCE::PERP-DASH-BTC')
  });
});
