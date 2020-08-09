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
    set.call(mockDate, 'second', '02.000');
    expect(mockDate.date).to.equal('2022-03-13T02:02:02.000Z');



    // const mockDateOffset = {
    //   date: '2020-08-02T02:33:58.000+04'
    // }
    // expect(get.call(mockDateOffset, 'date')).to.equal('2020-08-02');
    // expect(get.call(mockDateOffset, 'time')).to.equal('02:33:58.000+04');
    // expect(get.call(mockDateOffset, 'year')).to.equal('2020');
    // expect(get.call(mockDateOffset, 'month')).to.equal('08');
    // expect(get.call(mockDateOffset, 'day')).to.equal('02');
    // expect(get.call(mockDateOffset, 'hour')).to.equal('02');
    // expect(get.call(mockDateOffset, 'minute')).to.equal('33');
    // expect(get.call(mockDateOffset, 'second')).to.equal('58.000');
    // expect(get.call(mockDateOffset, 'timezone')).to.equal('+04');
  });
});
