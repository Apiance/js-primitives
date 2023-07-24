let milliSecondsInTimeframe = require('../utils/getTimeframeDurationInMilliseconds');
module.exports = function add(unit, value) {
    const curYear = this.get('year');
    switch (unit) {
        case "year":
        case "Y":
        case "y":
            this.set('year', Number(curYear) + value)
            return this;
        case "month":
        case "M":
            const dm = new Date(this.date);
            dm.setUTCMonth(dm.getUTCMonth() + value);
            this.date = new this.constructor({date: dm.toISOString()}).date
            return this;
        case "week":
        case "W":
        case "w":
            const dw = new Date(this.date);
            dw.setUTCDate(dw.getUTCDate() + (value * 7))
            this.date = new this.constructor({date: dw.toISOString()}).date
            return this;
        case "day":
        case "d":
            const dd = new Date(this.date);
            dd.setUTCDate(dd.getUTCDate() + (value))
            this.date = new this.constructor({date: dd.toISOString()}).date
            return this;
        case "hour":
        case "h":
            const dh = new Date(this.date);
            dh.setUTCHours(dh.getUTCHours() + (value))
            this.date = new this.constructor({date: dh.toISOString()}).date
            return this;
            this.date = this.constructor.fromNumber(this.to('ms') + value * milliSecondsInTimeframe("h")).date;
            return this;
        case "minute":
        case "min":
        case "m":
            const dmin = new Date(this.date);
            dmin.setUTCMinutes(dmin.getUTCMinutes() + (value))
            this.date = new this.constructor({date: dmin.toISOString()}).date
            return this;
        case "second":
        case "sec":
        case "s":
            const ds = new Date(this.date);
            ds.setUTCSeconds(ds.getUTCSeconds() + (value))
            this.date = new this.constructor({date: ds.toISOString()}).date
            return this;
        default:
            throw new Error(`Not handled unit ${unit}`);
    }

}
