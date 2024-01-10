import ZTrade from '../../ZTrade/ZTrade.js';
export default function toZTrade(){
  return new ZTrade(this.toCompressed());
}
