const { expect } = require('chai');
const set = require('./set');
const get = require('./get');
const startOf = require('./startOf');

const initial = '2020-08-02T01:33:58.000Z';

describe('Epoch.startOf', function suite(){
  it('should startOf', function () {
    const mockDate = {
      date: '2020-08-02T01:33:58.000Z',
      get,
      set
    }
    expect(startOf.call(mockDate, 'year').date).to.equal('2020-01-01T00:00:00.000Z');
    mockDate.date = initial;
    expect(startOf.call(mockDate, 'month').date).to.equal('2020-08-01T00:00:00.000Z');
    mockDate.date = initial;
    expect(startOf.call(mockDate, 'day').date).to.equal('2020-08-02T00:00:00.000Z');
    mockDate.date = initial;
    expect(startOf.call(mockDate, 'hour').date).to.equal('2020-08-02T01:00:00.000Z');
    mockDate.date = initial;
    expect(startOf.call(mockDate, 'minute').date).to.equal('2020-08-02T01:33:00.000Z');
    mockDate.date = initial;
    expect(startOf.call(mockDate, 'second').date).to.equal('2020-08-02T01:33:58.000Z');
  });
});
