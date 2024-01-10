import Epoch from "../../Epoch/Epoch.js";
/**
 * For a provided timestamp, it will return if it's within the frame of the candle
 *
 * @param timestamp - In nanoseconds
 * @return {boolean}
 */
export default function isWithinInterval(timestamp){
  const ts = new Epoch(timestamp);
  const startTs = this.openTime;
  const endTs = this.closeTime;
  return startTs<=ts && ts<=endTs;
}
