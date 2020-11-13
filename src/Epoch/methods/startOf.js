module.exports = function startOf(unit, opts = {}) {
  switch (unit) {
    case "year":
      this.set('day', '01');
      this.set('month', '01');
      this.set('time', '00:00:00.000');
      return this;
    case "week":
      const dayOfWeek = this.get('dayOfWeek');
      // default first day of week is monday for markets.
      const firstDay = (opts && opts.firstDay !== undefined) ? opts.firstDay : 1;
      const currentDay = this.get('day');
      this.set('day', parseInt(currentDay) - (dayOfWeek - firstDay));
      this.set('time', '00:00:00.000');
      return this;
    case "month":
      this.set('day', '01');
      this.set('time', '00:00:00.000');
      return this;
    case "day":
      this.set('hour', '00');
      this.set('minute', '00');
      this.set('second', '00');
      this.set('millisecond', '000');
      return this;
    case "hour":
      this.set('minute', '00');
      this.set('second', '00');
      this.set('millisecond', '000');
      return this;
    case "minute":
      this.set('second', '00');
      this.set('millisecond', '000');
      return this;
    case "second":
      this.set('millisecond', '000');
      return this;
    default:
      throw new Error(`Not handled unit ${unit}`);
  }

}
