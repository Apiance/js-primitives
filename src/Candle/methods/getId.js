import computeCandleId from "../utils/computeCandleId.js";

export default function getId() {
    const { market, interval, openTime, open, high, low, close } = this;
  return this.id ?? computeCandleId({
    toCompressed: () => {
      return `C::${market}::${interval}::${openTime}::${open}::${high}::${low}::${close}`;
    }
  });
}
