module.exports = function startOf(unit, opts = {}) {
  switch (unit) {
    case "year":
    case "Y":
    case "y":
      this.set('day', '01');
      this.set('month', '01');
      this.set('time', '00:00:00.000');
      return this;
    case "month":
    case "M":
      this.set('day', '01');
      this.set('time', '00:00:00.000');
      return this;
    case "week":
    case "W":
    case "w":
      const dayOfWeek = this.get('dayOfWeek');
      // default first day of week is monday for markets.
      const firstDay = (opts && opts.firstDay !== undefined) ? opts.firstDay : 1;
      const currentDay = this.get('day');
      this.set('day', parseInt(currentDay) - (dayOfWeek - firstDay));
      this.set('time', '00:00:00.000');
      return this;
    case "day":
    case "D":
    case "d":
      this.set('hour', '00');
      this.set('minute', '00');
      this.set('second', '00');
      this.set('millisecond', '000');
      return this;
    case "hour":
    case "h":
    case "H":
      this.set('minute', '00');
      this.set('second', '00');
      this.set('millisecond', '000');
      return this;
    case "minute":
    case "min":
    case "m":
      this.set('second', '00');
      this.set('millisecond', '000');
      return this;
    case "second":
    case "sec":
    case "s":
    case "S":
      this.set('millisecond', '000');
      return this;
    default:
      throw new Error(`Not handled unit ${unit}`);
  }

}
