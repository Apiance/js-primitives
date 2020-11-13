const timeframes = require('../constants/timeframes');

function getTimeframeDurationInMilliseconds(tf){
  return timeframes[tf];
}
module.exports = getTimeframeDurationInMilliseconds;
