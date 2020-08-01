module.exports = function to(unit = 's') {
  switch (unit) {
    case 'ms':
    case 'milli':
    case 'millis':
    case 'millisecond':
    case 'milliseconds':
      return this.date.valueOf();
    case 's':
    case 'second':
    case 'seconds':
      return Math.ceil(this.to('ms') / 1000);
      break;
    default:
      throw new Error(`Not handled unit ${unit}`);
  }
}
