const { expect } = require('chai');
const set = require('./set');
const get = require('./get');

describe('Epoch.set', function suite(){
  it('should set', function () {
    const mockDate = {
      date: '2020-08-02T00:33:58.000Z',
      get
    }
    set.call(mockDate, 'date', '2020-08-03')
    expect(mockDate.date).to.equal('2020-08-03T00:33:58.000Z');
    set.call(mockDate, 'time', '01:34:59.010');
    expect(mockDate.date).to.equal('2020-08-03T01:34:59.010Z');
    set.call(mockDate, 'year', '2022');
    expect(mockDate.date).to.equal('2022-08-03T01:34:59.010Z');
    set.call(mockDate, 'month', '03');
    expect(mockDate.date).to.equal('2022-03-03T01:34:59.010Z');
    set.call(mockDate, 'day', '13');
    expect(mockDate.date).to.equal('2022-03-13T01:34:59.010Z');
    set.call(mockDate, 'hour', '02');
    expect(mockDate.date).to.equal('2022-03-13T02:34:59.010Z');
    set.call(mockDate, 'minute', '02');
    expect(mockDate.date).to.equal('2022-03-13T02:02:59.010Z');
    set.call(mockDate, 'second', '02');
    expect(mockDate.date).to.equal('2022-03-13T02:02:02.010Z');
    set.call(mockDate, 'millisecond', '590');
    expect(mockDate.date).to.equal('2022-03-13T02:02:02.590Z');
    set.call(mockDate, 'millisecond', '0');
    expect(mockDate.date).to.equal('2022-03-13T02:02:02.000Z');

   // TODO Set offset
  });
});
