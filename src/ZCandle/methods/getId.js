import Epoch from "../../Epoch/Epoch.js";

export default function getId() {
    let id;

    const {c} = this;

    const propsNames = [null, 'exchange', 'symbol', 'interval', 'openTime', "id", 'open', 'high', 'low', 'close', 'volume', 'trades'];
    c.split('::').map((val, index, arr) => {
        if (index === 0) {
            if (val !== 'C') throw new Error('Wrong format');
            else return;
        }

        let propName = propsNames[index];
        switch (propName) {
            case 'id':
                id = new Epoch(val);
                break;
            default:
                break;
        }
    });
    return id;
}
