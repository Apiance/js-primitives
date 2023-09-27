const { expect } = require('chai');
const get = require('./get');

describe('Epoch.get', function suite(){
  it('should get', function () {
    const mockDate = {
      date: '2020-08-02T00:33:58.000Z'
    }
    expect(get.call(mockDate, 'date')).to.equal('2020-08-02');
    expect(get.call(mockDate, 'time')).to.equal('00:33:58.000Z');
    expect(get.call(mockDate, 'year')).to.equal('2020');
    expect(get.call(mockDate, 'month')).to.equal('08');
    expect(get.call(mockDate, 'week')).to.equal('31');
    expect(get.call(mockDate, 'day')).to.equal('02');
    expect(get.call(mockDate, 'hour')).to.equal('00');
    expect(get.call(mockDate, 'minute')).to.equal('33');
    expect(get.call(mockDate, 'second')).to.equal('58');
    expect(get.call(mockDate, 'millisecond')).to.equal('000');
    expect(get.call(mockDate, 'timezone')).to.equal('Z');

    const mockDateOffset = {
      date: '2020-08-02T02:33:58.000+04'
    }
    expect(get.call(mockDateOffset, 'date')).to.equal('2020-08-02');
    expect(get.call(mockDateOffset, 'time')).to.equal('02:33:58.000+04');
    expect(get.call(mockDateOffset, 'year')).to.equal('2020');
    expect(get.call(mockDateOffset, 'month')).to.equal('08');
    expect(get.call(mockDate, 'week')).to.equal('31');
    expect(get.call(mockDateOffset, 'day')).to.equal('02');
    expect(get.call(mockDateOffset, 'hour')).to.equal('02');
    expect(get.call(mockDateOffset, 'minute')).to.equal('33');
    expect(get.call(mockDateOffset, 'second')).to.equal('58');
    expect(get.call(mockDateOffset, 'millisecond')).to.equal('000');
    expect(get.call(mockDateOffset, 'timezone')).to.equal('+04');

    expect(get.call({
      date: '2020-01-02T00:33:58.000Z'
    }, 'week')).to.equal('1');

    expect(get.call({
      date: '2020-02-02T00:33:58.000Z'
    }, 'week')).to.equal('5');

    // as per iso8601, week 53 is an expected value
    expect(get.call({
      date: '2020-12-30T00:33:58.000Z'
    }, 'week')).to.equal('53');
  });
});
