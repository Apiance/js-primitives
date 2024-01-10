import {expect, describe, it} from 'vitest';
import ZCandle from './ZCandle.js';
import Candle from '../Candle/Candle.js';

describe('ZCandle', function suite() {
    const zippedCandleStr1 = 'C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::C43F16FD1DCB9::10000::10111::10000::10100::0';
    const zippedCandleStr2 = 'C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::C43F16FD1DCB9::10000::10111::10000::10100::42';
    const zippedCandleStr3 = 'C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::C43F16FD1DCB9::10000::10111::10000::10100::-151500::42';
    const zippedCandleStr4 = 'C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::C43F16FD1DCB9::10000::10111::10000::10100::15-151500::42';
    const zippedCandleStr5 = 'C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::C43F16FD1DCB9::10000::10111::10000::10100::15-::42';
    const zippedCandleStr6 = 'C::KRAKEN::BTCUSD::1d::2020-08-02T00:00:00.000Z::C43F16FD1DCB9::10000::10111::10000::10100::15-::0';
    const opts = {
        exchange: 'KRAKEN',
        symbol: 'BTCUSD',
        interval: '1d',
        timestamp: '2020-08-02T00:00:00.000Z',
        open: '10000',
        high: '10111',
        low: '10000',
        close: '10100',
    };
    const candle1 = new Candle(opts);
    const candle2 = new Candle({...opts, trades: "42"});
    const candle3 = new Candle({...opts, trades: "42", volume: {quote: "151500"}});
    const candle4 = new Candle({...opts, trades: "42", volume: {quote: "151500", base: "15"}});
    const candle5 = new Candle({...opts, trades: "42", volume: {base: "15"}});
    const candle6 = new Candle({...opts, volume: {base: "15"}});
    it('should instantiates', () => {
        let zcandle = new ZCandle();
        expect(zcandle).to.exist;
    })
    it('should init from candle', function () {
        const zcandle1 = new ZCandle(candle1);
        expect(zcandle1.toString()).to.equal(zippedCandleStr1);
        const zcandle2 = new ZCandle(candle2);
        expect(zcandle2.toString()).to.equal(zippedCandleStr2);
        const zcandle3 = new ZCandle(candle3);
        expect(zcandle3.toString()).to.equal(zippedCandleStr3);
        const zcandle4 = new ZCandle(candle4);
        expect(zcandle4.toString()).to.equal(zippedCandleStr4);
        const zcandle5 = new ZCandle(candle5);
        expect(zcandle5.toString()).to.equal(zippedCandleStr5);
        const zcandle6 = new ZCandle(candle6);
        expect(zcandle6.toString()).to.equal(zippedCandleStr6);
    });
    it('should init from zipped', function () {
        const zcandle1 = new ZCandle(zippedCandleStr1);
        expect(zcandle1.toString()).to.equal(zippedCandleStr1);

        const zcandle2 = new ZCandle(zippedCandleStr2);
        expect(zcandle2.toString()).to.equal(zippedCandleStr2);

        const zcandle3 = new ZCandle(zippedCandleStr3);
        expect(zcandle3.toString()).to.equal(zippedCandleStr3);

        const zcandle4 = new ZCandle(zippedCandleStr4);
        expect(zcandle4.toString()).to.equal(zippedCandleStr4);

        const zcandle5 = new ZCandle(zippedCandleStr5);
        expect(zcandle5.toString()).to.equal(zippedCandleStr5);

        const zcandle6 = new ZCandle(zippedCandleStr6);
        expect(zcandle6.toString()).to.equal(zippedCandleStr6);
    });
    it('should convert to candle', function () {
        const zcandle1 = new ZCandle(zippedCandleStr1);
        expect(zcandle1.toCandle()).to.deep.equal(candle1);

        const zcandle2 = new ZCandle(zippedCandleStr2);
        expect(zcandle2.toCandle()).to.deep.equal(candle2);

        const zcandle3 = new ZCandle(zippedCandleStr3);
        expect(zcandle3.toCandle()).to.deep.equal(candle3);

        const zcandle4 = new ZCandle(zippedCandleStr4);
        expect(zcandle4.toCandle()).to.deep.equal(candle4);

        const zcandle5 = new ZCandle(zippedCandleStr5);
        expect(zcandle5.toCandle()).to.deep.equal(candle5);

        const zcandle6 = new ZCandle(zippedCandleStr6);
        expect(zcandle6.toCandle()).to.deep.equal(candle6);
    });
    it('should create from candle', function () {
        const zcandle = new ZCandle(zippedCandleStr1);
        const candle = zcandle.toCandle();

        expect(new ZCandle(candle)).to.deep.equal(zcandle);
    });
    it('should clone', function () {
        const zcandle = new ZCandle(zippedCandleStr1);
        const zcandle1 = new ZCandle(zcandle);
        expect(zcandle1.clone()).to.deep.equal(zcandle);
    });
    it('should correctly go back and forth', function () {
        const x = {
            "market": {"exchange": "FTX", "type": "PERP", "symbol": "BTC-PERP", "quote": "USD", "base": "BTC"},
          interval: '10s',
          open: '19130',
          close: '19130',
          low: '19129',
          high: '19130',
          volume: { base:'0.0044', quote: '84.1717' },
          openTime: { date: '2022-10-15T18:27:00.000Z' },
          closeTime:  { date: '2022-10-15T18:27:09.999Z' },
          trades: '4'
        };
        const candle = new Candle(x);
        const zcandle = candle.toZCandle();
        expect(zcandle.toCandle()).to.deep.equal(candle);
    });
});
