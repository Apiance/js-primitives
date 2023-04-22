module.exports = function get(unit) {
  let subPart;
  let lastChar;
  switch (unit) {
    case "timezone":
      const lastLetter = this.date[this.date.length-1];
      if(Number.isNaN(Number(lastLetter))){
        return lastLetter;
      }else{
        if(this.date.includes('+')){
          return '+'+this.date.split('+')[1];
        }
      }
      return 'Z';
    case "date":
      return this.date.split('T')[0];
    case "time":
      return this.date.split('T')[1];
    case "dayOfWeek":
      return new Date(this.date).getDay();
    case "year":
    case "Y":
    case "y":
      return this.date.split('-')[0];
    case "month":
    case "M":
      return this.date.split('-')[1];
    case "day":
    case "d":
    case "D":
      return this.date.split('-')[2].slice(0,2);
    case "hour":
    case "h":
    case "H":
      return this.date.split(':')[0].slice(-2);
    case "minute":
    case "min":
    case "m":
      return this.date.split(':')[1];
    case "second":
    case "sec":
    case "s":
       subPart = this.date.split(':')[2];
       return subPart.split('.')[0];
    case "millisecond":
    case "ms":
      subPart = this.date.split('.')[1];
      lastChar = subPart[subPart.length-1];
      if(Number.isNaN(Number(lastChar))){
        return subPart.slice(0, -1);
      }else {
        if(subPart.includes('+')){
          return subPart.split('+')[0];
        }
      }
      break;
    default:
      throw new Error(`Not supproted unit: ${unit}`)
  }
};
