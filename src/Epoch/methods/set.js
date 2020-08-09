module.exports = function set(unit, value) {
  const timeSplitIndex = this.date.indexOf('T')
  const splittedDate = this.date.split('-');
  const splittedTime = this.date.split(':');
  const stringifiedValue = value.toString();
  switch (unit) {
    case "date":
      this.date = `${stringifiedValue}${this.date.slice(timeSplitIndex)}`;
      return this;
    case "time":
      this.date = `${this.date.slice(0,timeSplitIndex)}T${stringifiedValue}${this.get('timezone')}`;
      return this;
    case "year":
      this.date = `${stringifiedValue}${this.date.slice(this.date.indexOf('-'))}`;
      return this;
    case "month":
      this.date = `${splittedDate[0]}-${stringifiedValue.padStart(2, '0')}-${splittedDate[2]}`;
      return this;
    case "day":
      this.date = `${splittedDate[0]}-${splittedDate[1]}-${stringifiedValue}${this.date.slice(timeSplitIndex)}`;
      return this;
    case "hour":
      this.date = `${splittedTime[0].slice(0, -2)}${stringifiedValue}:${splittedTime[1]}:${splittedTime[2]}`;
      return this;
    case "minute":
      this.date = `${splittedTime[0]}:${stringifiedValue}:${splittedTime[2]}`;
      return this;
    case "second":
      this.date = `${splittedTime[0]}:${splittedTime[1]}:${stringifiedValue}${this.get('timezone')}`;
      return this;
    case "millisecond":


      this.date = `${splittedTime[0]}:${splittedTime[1]}:${splittedTime[2].split('.')[0]}.${stringifiedValue.padStart(3,'0')}${this.get('timezone')}`;
      return this;
    default:
      throw new Error(`Not supported unit: ${unit}`)
  }
};
