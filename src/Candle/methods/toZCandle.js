import ZCandle from '../../ZCandle/ZCandle.js';

export default function toZCandle(){
  const compressed = this.toCompressed();
  return new ZCandle(compressed);
}
