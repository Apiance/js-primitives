
export default function generatePath(market, interval, epoch){
  const year = epoch.format('YYYY');
  const month =  epoch.format('MM');
  const day =  epoch.format('DD');
  return `${market.exchange}/${market.symbol}/${interval}/${year}/${month}/${day}/${epoch.toString()}`;
}
