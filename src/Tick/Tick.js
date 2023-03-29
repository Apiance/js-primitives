const Market = require("../Market/Market");
const Epoch = require("../Epoch/Epoch");

class Tick {
  constructor(props = {}) {
    this.market = new Market(props.market);
    this.rate = props.rate || null;
    this.timestamp = new Epoch(props.timestamp || null);
  }
};
Tick.prototype.toCompressed = require('./methods/toCompressed');
module.exports = Tick;
