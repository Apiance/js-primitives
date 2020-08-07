const generateId = require('../utils/generateId');

module.exports = function getId() {
  return generateId(this.market, this.timeframe, this.openTime);
}
