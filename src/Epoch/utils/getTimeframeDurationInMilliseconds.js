import timeframes from '../constants/timeframes.js';

function getTimeframeDurationInMilliseconds(tf){
  return timeframes[tf];
}
export default getTimeframeDurationInMilliseconds;
