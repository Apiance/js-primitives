export default function toCompressed(){
  const market = this.market;
  const { timestamp, rate} = this;
  return `Z::${market}::${timestamp}::${rate}`;
}
