import Market from "../Market/Market.js";
import Epoch from "../Epoch/Epoch.js";
import computeTradeId from "./utils/computeTradeId.js";
import toZTrade from "./methods/toZTrade.js";
import toJSON from "./methods/toJSON.js";
import toID from "./methods/toID.js";
import toCompressed from "./methods/toCompressed.js";

class Trade {
  /**
   *
   * @param props
   * @param {Date.toUTC} props.timestamp - UTC ISO Timestamp
   */
  constructor(props = {}) {
    this.market = null;
    if(props.market){
        this.market = new Market(props.market);
    }


    this.rate = props.rate || null;
    this.quantity = props.quantity || null;
    this.side = props.side || null;

    this.buyOrderId = props.buyOrderId || null;
    this.sellOrderId = props.sellOrderId || null;

    this.timestamp = new Epoch(props.timestamp || null);
    this.id = props.id || computeTradeId(this)
  }
};
Trade.prototype.toCompressed = toCompressed;
Trade.prototype.toID = toID;
Trade.prototype.toJSON = toJSON;
Trade.prototype.toZTrade = toZTrade
export default Trade;
