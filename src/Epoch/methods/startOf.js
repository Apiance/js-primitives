module.exports = function startOf(unit) {
  switch (unit) {
    case "year":
      this.set('day', '01');
      this.set('month', '01');
      this.set('time', '00:00:00.000');
      return this;
    case "month":
      this.set('day', '01');
      this.set('time', '00:00:00.000');
      return this;
    case "day":
      this.set('hour', '00');
      this.set('minute', '00');
      this.set('second', '00.000');
      return this;
    case "hour":
      this.set('minute', '00');
      this.set('second', '00.000');
      return this;
    case "minute":
      this.set('second', '00.000');
      return this;
    case "second":
      this.set('second',  this.get('second').slice(0,2)+'.000');
      return this;
    default:
      throw new Error(`Not handled unit ${unit}`);
  }

}
