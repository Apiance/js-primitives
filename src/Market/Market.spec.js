import {expect, describe, it} from 'vitest';
import Market from './Market.js';


const CASES = [
    ['BINANCE::DASHBTC', {
        exchange: 'BINANCE',
        symbol: 'DASHBTC',
        type: Market.MARKET_TYPES.PERP,
        quote: 'BTC',
        base: 'DASH'
    }],
    ['BINANCE::DASH-BTC', {
        exchange: 'BINANCE',
        symbol: 'DASH-BTC',
        quote: 'BTC',
        base: 'DASH',
        type: Market.MARKET_TYPES.SPOT
    }],
    ['BYBIT::BTCUSDT', {
        exchange: 'BYBIT',
        symbol: 'BTCUSDT',
        quote: 'USDT',
        base: 'BTC',
        type: Market.MARKET_TYPES.PERP
    }],
    ['BYBIT::BTC-USDT', {
        exchange: 'BYBIT',
        symbol: 'BTC-USDT',
        quote: 'USDT',
        base: 'BTC',
        type: Market.MARKET_TYPES.SPOT
    }],
]


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

    it('should correctly parse string', () => {
        CASES.forEach(([input, expected]) => {
            const m = new Market(input);
            try {
                expect(m.toJSON()).to.deep.equal(expected);
            } catch (e) {
                throw new Error(`Failed to parse ${input} to: \n ${JSON.stringify(expected)} got \n ${JSON.stringify(m.toJSON())}`);
            }
        });

    });

    it('should correctly parse from params', () => {
        CASES.forEach(([input, expected]) => {
            const m = new Market(expected);
            try {
                expect(m.toJSON()).to.deep.equal(expected);
            } catch (e) {
                throw new Error(`Failed to parse ${input} to: \n ${JSON.stringify(expected)} got \n ${JSON.stringify(m.toJSON())}`);
            }
        });
    });

    it('should toJSON', function () {
        const expected = {
            exchange: "BINANCE",
            symbol:'DASHBTC',
            type: Market.MARKET_TYPES.PERP,
            quote: 'BTC',
            base: 'DASH'
        }
        try {
            let market = new Market({exchange: 'Binance', symbol:'DASHBTC'});
            expect(market.toJSON()).to.deep.equal(expected);
        } catch (e) {
            throw new Error(`Failed to parse ${JSON.stringify(expected)} got \n ${JSON.stringify(market.toJSON())}`);
        }
    });

    it('should to compressed', function () {
        expect(new Market('FTX::BTC-PERP').toCompressed()).to.equal('FTX::BTC-PERP');
        expect(new Market('BINANCE::BTC-USDT').toCompressed()).to.equal('BINANCE::BTC-USDT');
        expect(new Market('BYBIT::BTCUSDT').toCompressed()).to.equal('BYBIT::BTCUSDT');
        expect(new Market('BYBIT::BTC-USDT').toCompressed()).to.equal('BYBIT::BTC-USDT');
    });
    it('should hold specific cases', function () {
        let market = new Market('FTX::BTC-PERP');
        expect(market.toJSON()).to.deep.equal({
            "base": "BTC",
            "exchange": "FTX",
            "quote": "USD",
            "symbol": "BTC-PERP",
            "type": 'PERP'
        })

        expect(market.toCompressed()).to.equal('FTX::BTC-PERP');
        expect(market.toString()).to.equal('FTX::BTC-PERP');
        expect(market.exchange).to.equal('FTX');
        expect(market.symbol).to.equal('BTC-PERP');
        expect(market.quote).to.equal('USD');
        expect(market.base).to.equal('BTC');
        expect(market.type).to.equal('PERP');
    });
});
