import {expect} from "chai";
import Candle from "../Candle.js";
import computeCandleId from "./computeCandleId.js";

describe('computeTradeId', function suite() {
    it('should compute', function () {
        const candle = new Candle({
            market: {
                exchange: 'BINANCE',
                symbol: 'ETHUSDT',
            },
            interval: '1m',
            open: '1828.99000000',
            close: '1829.14000000',
            low: '1828.98000000',
            high: '1829.81000000',
            trades: '337',
            hash: '0',
            timestamp: '2023-07-24T14:24:00.000Z',
            tradesIds: []
        });

        expect(computeCandleId(candle)).to.equal('C85A250E99915');
    });
});
