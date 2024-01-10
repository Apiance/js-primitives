import Market from "../Market/Market.js";
import Epoch from "../Epoch/Epoch.js";
import toCompressed from "./methods/toCompressed.js";
class Tick {
  constructor(props = {}) {
    this.market = new Market(props.market);
    this.rate = props.rate || null;
    this.timestamp = new Epoch(props.timestamp || null);
  }
};
Tick.prototype.toCompressed = toCompressed;

export default Tick;
