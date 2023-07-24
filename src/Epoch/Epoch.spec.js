const {expect} = require('chai');
const Epoch = require('./Epoch');

describe('Epoch', function suite() {
    let epoch;
    let controlDate;

    it('should instantiates with now as default', () => {
        controlDate = new Date();
        epoch = new Epoch();
        expect(epoch).to.exist;
    })
    it('should get iso now', function () {
        expect(Epoch.toISOString().slice(0, -5)).to.equal(controlDate.toISOString().slice(0, -5));
        expect(Epoch.toISOString().slice(0, -5)).to.equal(epoch.toTimestamp().slice(0, -5));
    });
    it('should convert to other unit', function () {
        expect(epoch.to('ms')).to.gte(controlDate.valueOf());
        expect(epoch.to('ms')).to.lte(controlDate.valueOf() + 10);

        expect(epoch.to('milliseconds')).to.equal(epoch.to('ms'));
        expect(epoch.to('ns')).to.equal(epoch.to('nanosecond'));

        expect(epoch.to('s')).to.equal(Math.ceil(epoch.to('ms') / 1000));
        expect(epoch.toString()).to.equal(controlDate.toISOString());
        expect(epoch.inspect()).to.equal(`<Epoch ${epoch.toString()}>`);
    });

    it('should init from past date', function () {
        const isoStr = new Epoch('2020-08-01T23:00:00.000Z');
        expect(isoStr.toTimestamp()).to.equal('2020-08-01T23:00:00.000Z');
        expect(isoStr.toTimestamp('ISO')).to.equal('2020-08-01T23:00:00.000Z');
        expect(isoStr.toTimestamp('s')).to.equal(isoStr.to('s'));
        expect(isoStr.toTimestamp('s')).to.equal(1596322800);
        expect(isoStr.toTimestamp('ms')).to.equal(1596322800000);

        const nsecEpo = new Epoch(isoStr.toTimestamp('ns'));
        expect(nsecEpo.toTimestamp()).to.equal('2020-08-01T23:00:00.000Z');
        expect(nsecEpo.toTimestamp('ISO')).to.equal('2020-08-01T23:00:00.000Z');
        expect(nsecEpo.toTimestamp('s')).to.equal(isoStr.to('s'));
        expect(nsecEpo.toTimestamp('ms')).to.equal(1596322800000);

        const msecEpo = new Epoch(isoStr.toTimestamp('ms'));
        expect(msecEpo.toTimestamp()).to.equal('2020-08-01T23:00:00.000Z');
        expect(msecEpo.toTimestamp('ISO')).to.equal('2020-08-01T23:00:00.000Z');
        expect(msecEpo.toTimestamp('s')).to.equal(isoStr.to('s'));
        expect(msecEpo.toTimestamp('ms')).to.equal(1596322800000);

        const secEpo = new Epoch(msecEpo.toTimestamp('s'));
        expect(secEpo.toTimestamp()).to.equal('2020-08-01T23:00:00.000Z');
        expect(secEpo.toTimestamp('ISO')).to.equal('2020-08-01T23:00:00.000Z');
        expect(secEpo.toTimestamp('s')).to.equal(isoStr.to('s'));
        expect(secEpo.toTimestamp('ms')).to.equal(1596322800000);
        expect(secEpo.toTimestamp('ns')).to.equal(1596322800000000000);

        const timestampAsStr = new Epoch('1596417191996');
        expect(timestampAsStr.date).to.equal('2020-08-03T01:13:11.996Z');
    });
    it('should get format', function () {
        const epoch = new Epoch('2020-08-02T00:33:58.000Z')
        const year = epoch.format('YYYY');
        expect(year).to.equal('2020');
        const month = epoch.format('MM');
        expect(month).to.equal('08');
        const day = epoch.format('DD');
        expect(day).to.equal('02');
        expect(epoch.format('hh')).to.equal('00');
        expect(epoch.format('mm')).to.equal('33');
        expect(epoch.format('ss')).to.equal('58');
    });
    it('should get day of week', function () {
        const e2 = new Epoch('2020-11-13T02:28:26.865Z');
        expect(e2.get('dayOfWeek')).to.equal(5)
    });
    it('should get to start of unit', function () {
        const e1 = new Epoch('2020-08-02T00:33:58.130Z')
        expect(e1.startOf('minute').date).to.equal('2020-08-02T00:33:00.000Z');


    });
    it('should set startOf week', function () {
        const e2 = new Epoch('2020-11-13T02:28:26.865Z');
        expect(e2.startOf('week').date).to.equal('2020-11-09T00:00:00.000Z')
        // sunday
        expect(e2.startOf('week', {firstDay: 0}).date).to.equal('2020-11-08T00:00:00.000Z')
        // monday
        expect(e2.startOf('week', {firstDay: 1}).date).to.equal('2020-11-09T00:00:00.000Z')
    });
    it('should get to end of unit', function () {
        const e1 = new Epoch('2020-08-02T00:33:58.130Z')
        expect(e1.endOf('minute').date).to.equal('2020-08-02T00:33:59.999Z');
    });
    it('should add unit', function () {
        const e1 = new Epoch('2020-08-02T00:33:58.130Z')
        expect(e1.add('day', 1).date).to.equal('2020-08-03T00:33:58.130Z');
        expect(e1.add('hour', 1).date).to.equal('2020-08-03T01:33:58.130Z');
        expect(e1.add('minute', 1).date).to.equal('2020-08-03T01:34:58.130Z');
        expect(e1.add('day', 28).date).to.equal('2020-08-31T01:34:58.130Z');
        expect(e1.add('month', 1).date).to.equal('2020-10-01T01:34:58.130Z');
        expect(e1.add('month', 1).date).to.equal('2020-11-01T01:34:58.130Z');
        expect(e1.add('year', 1).date).to.equal('2021-11-01T01:34:58.130Z');
        expect(e1.add('week', 1).date).to.equal('2021-11-08T01:34:58.130Z');
    });
    it('should substract unit', function () {
        const e1 = new Epoch('2020-08-02T00:33:58.130Z')
        expect(e1.subtract('day', 1).date).to.equal('2020-08-01T00:33:58.130Z');
        expect(e1.subtract('hour', 1).date).to.equal('2020-07-31T23:33:58.130Z');
        expect(e1.subtract('minute', 1).date).to.equal('2020-07-31T23:32:58.130Z');
        expect(e1.subtract('month', 1).date).to.equal('2020-07-01T23:32:58.130Z');
        expect(e1.subtract('month', 1).date).to.equal('2020-06-01T23:32:58.130Z');
        expect(e1.subtract('year', 1).date).to.equal('2019-06-01T23:32:58.130Z');
        expect(e1.subtract('week', 1).date).to.equal('2019-05-25T23:32:58.130Z');
    });
    it('should handle subtracting months with different number of days', function () {
        const e1 = new Epoch('2020-03-31T00:00:00.000Z');
        expect(e1.subtract('month', 1).date).to.equal('2020-03-02T00:00:00.000Z');
        const e2 = new Epoch('2020-03-01T00:00:00.000Z');
        expect(e2.subtract('month', 2).date).to.equal('2020-01-01T00:00:00.000Z');
    });

    it('should handle adding weeks spanning across months', function () {
        const e1 = new Epoch('2020-01-26T00:00:00.000Z'); // Last Sunday in January 2020
        expect(e1.add('week', 1).date).to.equal('2020-02-02T00:00:00.000Z'); // First Sunday in February 2020
    });

    it('should handle subtracting weeks spanning across months', function () {
        const e1 = new Epoch('2020-02-02T00:00:00.000Z'); // First Sunday in February 2020
        expect(e1.subtract('week', 1).date).to.equal('2020-01-26T00:00:00.000Z'); // Last Sunday in January 2020
    });

    it('should handle adding and subtracting large values of units 1', function () {
        const e1 = new Epoch('2020-01-01T00:00:00.000Z');
        expect(e1.add('year', 1000).date).to.equal('3020-01-01T00:00:00.000Z');
        expect(e1.add('month', 10000).date).to.equal('3853-05-01T00:00:00.000Z');
        expect(e1.add('week', 10000).date).to.equal('4044-12-25T00:00:00.000Z');
        expect(e1.add('day', 10000).date).to.equal('4072-05-12T00:00:00.000Z');
        expect(e1.add('hour', 100000).date).to.equal('4083-10-08T16:00:00.000Z');
        expect(e1.add('minute', 1000000).date).to.equal('4085-09-02T02:40:00.000Z');
        expect(e1.add('second', 10000000).date).to.equal('4085-12-26T20:26:40.000Z');

        expect(e1.subtract('year', 1000).date).to.equal('3085-12-26T20:26:40.000Z');
        expect(e1.subtract('month', 10000).date).to.equal('2252-08-26T20:26:40.000Z');
        expect(e1.subtract('week', 10000).date).to.equal('2060-12-30T20:26:40.000Z');
        expect(e1.subtract('day', 10000).date).to.equal('2033-08-14T20:26:40.000Z');
        expect(e1.subtract('hour', 100000).date).to.equal('2022-03-19T04:26:40.000Z');
        expect(e1.subtract('minute', 1000000).date).to.equal('2020-04-23T17:46:40.000Z');
        expect(e1.subtract('second', 10000000).date).to.equal('2019-12-30T00:00:00.000Z');
    });
    it('should pass', function () {
        const e1 = new Epoch('2020-08-02T00:33:58.130Z')
        expect(e1.add('day', 1).date).to.equal('2020-08-03T00:33:58.130Z');
        expect(e1.add('hour', 1).date).to.equal('2020-08-03T01:33:58.130Z');
        expect(e1.add('minute', 1).date).to.equal('2020-08-03T01:34:58.130Z');
        expect(e1.add('day', 28).date).to.equal('2020-08-31T01:34:58.130Z');
        expect(e1.add('month', 1).date).to.equal('2020-10-01T01:34:58.130Z');
        expect(e1.add('month', 1).date).to.equal('2020-11-01T01:34:58.130Z');
    });

});
