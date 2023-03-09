// const x = {
//     "market": {"exchange": "FTX", "type": "PERP", "symbol": "BTC-PERP", "quote": "USD", "base": "BTC"},
//     interval: '10s',
//     open: '19130',
//     close: '19130',
//     low: '19129',
//     high: '19130',
//     volume: { base:'0.0044', quote: '84.1717' },
//     openTime: { date: '2022-10-15T18:27:00.000Z' },
//     closeTime:  { date: '2022-10-15T18:27:09.999Z' },
//     trades: '4'
// };
//
// const Candle  = require('./src/Candle/Candle');
//
// const a = new Candle(x);
// console.log({a});
// const b = a.toZCandle();
// console.log({b});
// const c = b.toCandle();
// console.log({c});

// const {createLogger} = require('./index')
// const logger = createLogger();

// logger.info('y');
// logger.level = 'fatal';
// logger.info('x');
// logger.fatal('x');

// const { Candle } = require('./index')
// const c = new Candle({
//     exchange:'Binance'
// });
// c.considerTradeId(185404189)
// c.considerTradeId(185404190)
//
// console.log(c.toZCandle().toCandle());


const createLogger = require('./src/createLogger');

const logger = createLogger({prefix: 'TEST', level: 'debug'})
logger.info('y');
logger.debug('x')
logger.trace('x')
