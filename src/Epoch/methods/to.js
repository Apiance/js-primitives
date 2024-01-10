export default function to(unit = 's') {
  switch (unit) {
    case "ns":
    case "nanosecond":
    case "nanoseconds":
      return this.to('ms')*1000000;
    case 'ms':
    case 'milli':
    case 'millis':
    case 'millisecond':
    case 'milliseconds':
      return new Date(this.date).valueOf();
    case 's':
    case 'second':
    case 'seconds':
      return Math.ceil(this.to('ms') / 1000);
      break;
    default:
      throw new Error(`Not handled unit ${unit}`);
  }
}
