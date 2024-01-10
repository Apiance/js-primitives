import generateId from '../utils/generateId.js';
export default function getId() {
  return generateId(this.market, this.interval, this.openTime);
}
