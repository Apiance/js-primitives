module.exports = function toTimestamp(format = 'ISO'){
  switch (format) {
    case 'ISO':
      return this.toString();
    case 's':
    case 'second':
    case 'seconds':
      return this.to('s');
    case "ms":
    case "milli":
    case "millisec":
    case "millisecond":
    case "milliseconds":
      return this.to('ms');
    case "ns":
    case "nanosec":
    case "nanosecond":
    case "nanoseconds":
      return this.to('ns');
  }
}
