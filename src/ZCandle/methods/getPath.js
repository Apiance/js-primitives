import generatePath from '../../Candle/utils/generatePath.js';
import Epoch from "../../Epoch/Epoch.js";

export default function getPath() {
    let symbol, exchange, interval, openTime;

    const {c} = this;
    const propsNames = [null, 'exchange', 'symbol', 'interval', 'openTime', "id", 'open', 'high', 'low', 'close', 'volume', 'trades'];
    c.split('::').map((val, index, arr) => {
        if (index === 0) {
            if (val !== 'C') throw new Error('Wrong format');
            else return;
        }

        let propName = propsNames[index];
        switch (propName) {
            case 'openTime':
                openTime = new Epoch(val);
                break;
            case 'interval':
                interval = val;
                break;
            case 'exchange':
                exchange = val;
                break;
            case 'symbol':
                symbol = val;
                break;
            default:
                break;
        }
    });


    return generatePath({
        symbol,
        exchange,
    }, interval, openTime);
}
