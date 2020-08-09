module.exports = function get(unit) {
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

    case "year":
      return this.date.split('-')[0];
    case "month":
      return this.date.split('-')[1];
    case "day":
      return this.date.split('-')[2].slice(0,2);
    case "hour":
      return this.date.split(':')[0].slice(-2);
    case "minute":
      return this.date.split(':')[1];
    case "second":
      const subpart = this.date.split(':')[2];
      const lastChar = subpart[subpart.length-1];
      if(Number.isNaN(Number(lastChar))){
        return subpart.slice(0, -1);
      }else {

        if(subpart.includes('+')){
          return subpart.split('+')[0];
        }
      }
      return subpart;
    default:
      throw new Error(`Not supproted unit: ${unit}`)
  }
};
