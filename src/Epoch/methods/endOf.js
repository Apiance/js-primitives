module.exports = function endOf(unit, opts = {}) {
  switch (unit) {
    case "year":
    case "Y":
    case "y":
      this.set('day', '31');
      this.set('month', '12');
      this.set('time', '23:59:59.999');
      return this;
    case "month":
    case "M":
      const month = this.get('month');
      if(["01", "03", "05", "07", "08", "10", "12"].includes(month)){
        this.set('day', '31');
      }else{
        if(month === '03'){
          let isLeap = year => new Date(year, 1, 29).getDate() === 29;
          (isLeap(this.get('year'))) ? this.set('day', 29) : this.set('day', 28);
        }else{
          this.set('day', '30');
        }
      }
      this.set('time', '23:59:59.999');
      return this;
    case "week":
    case "W":
    case "w":
      const dayOfWeek = this.get('dayOfWeek');
      // default first day of week is monday for markets.
      const firstDay = (opts && opts.firstDay !== undefined) ? opts.firstDay : 1;
      const currentDay = this.get('day');
      let lastDay = (opts.lastDay) ? opts.lastDay + 1 : 7 + firstDay;
        const numberOfDaysToAdd = (lastDay - dayOfWeek) - 1;
      this.set('day', parseInt(currentDay) + numberOfDaysToAdd);
      this.set('time', '23:59:59.999');
      return this;
    case "day":
    case "D":
    case "d":
      this.set('hour', '23');
      this.set('minute', '59');
      this.set('second', '59');
      this.set('millisecond', '999');
      return this;
    case "hour":
    case "h":
    case "H":
      this.set('minute', '59');
      this.set('second', '59');
      this.set('millisecond', '999');
      return this;
    case "minute":
    case "min":
    case "m":
      this.set('second', '59');
      this.set('millisecond', '999');
      return this;
    case "second":
    case "sec":
    case "s":
    case "S":
      this.set('millisecond', '999');
      return this;
    default:
      throw new Error(`Not handled unit ${unit}`);
  }

}
