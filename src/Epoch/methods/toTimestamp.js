module.exports = function toTimestamp(format = 'ISO'){
  switch (format) {
    case 'ISO':
      return this.toString();
    case 's':
      return this.to('s');
    case "ms":
      return this.to('ms');
  }
}
