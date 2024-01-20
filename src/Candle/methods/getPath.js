import generatePath from '../utils/generatePath.js';
export default function getPath() {
  return generatePath(this.market, this.interval, this.openTime);
}
