const { expect } = require('chai');
const set = require('./set');
const get = require('./get');
const endOf = require('./endOf');

const initial = '2020-08-02T01:33:58.000Z';

describe('Epoch.endOf', function suite(){
  it('should endOf', function () {
    const mockDate = {
      date: '2020-08-02T01:33:58.000Z',
      get,
      set
    }
    expect(endOf.call(mockDate, 'year').date).to.equal('2020-12-31T23:59:59.999Z');
    mockDate.date = initial;
    expect(endOf.call(mockDate, 'month').date).to.equal('2020-08-31T23:59:59.999Z');
    mockDate.date = initial;
    expect(endOf.call(mockDate, 'day').date).to.equal('2020-08-02T23:59:59.999Z');
    mockDate.date = initial;
    expect(endOf.call(mockDate, 'hour').date).to.equal('2020-08-02T01:59:59.999Z');
    mockDate.date = initial;
    expect(endOf.call(mockDate, 'minute').date).to.equal('2020-08-02T01:33:59.999Z');
    mockDate.date = initial;
    expect(endOf.call(mockDate, 'second').date).to.equal('2020-08-02T01:33:58.999Z');
  });
});
