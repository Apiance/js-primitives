import {describe,expect, it} from 'vitest';
import set from './set.js';
import get from './get.js';
import endOf from './endOf.js';

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
  it('should end of week', function () {
    const initialDate = '2020-11-13T02:43:35.744Z';
    const mockDate = {
      date:  initialDate,
      get,
      set
    }
    expect(endOf.call(mockDate, 'week').date).to.equal('2020-11-15T23:59:59.999Z');
    mockDate.date = initialDate;
    expect(endOf.call(mockDate, 'week', { firstDay: 0 }).date).to.equal('2020-11-14T23:59:59.999Z');
    mockDate.date = initialDate;
    expect(endOf.call(mockDate, 'week', { firstDay: 1 }).date).to.equal('2020-11-15T23:59:59.999Z');
    mockDate.date = initialDate;
    expect(endOf.call(mockDate, 'week', { lastDay: 5 }).date).to.equal('2020-11-13T23:59:59.999Z');
    mockDate.date = initialDate;
    expect(endOf.call(mockDate, 'week', { lastDay: 6 }).date).to.equal( '2020-11-14T23:59:59.999Z');

  });
});
