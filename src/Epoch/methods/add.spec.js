import {expect, describe, it} from 'vitest';
import Epoch from '../Epoch.js';
import get from './get.js';
import set from './set.js';
import add from './add.js';
import to from './to.js';
const initial = '2020-08-02T01:33:58.000Z';


describe('Epoch.add', function suite(){
  it('should add', function () {
    const mockDate = {
      date: '2020-08-02T01:33:58.000Z',
      get,
      set,
      to,
    }
    mockDate.constructor.fromNumber = Epoch.fromNumber;

    expect(add.call(mockDate, 'year', 1).date).to.equal('2021-08-02T01:33:58.000Z');
    expect(add.call(mockDate, 'month',1).date).to.equal('2021-09-02T01:33:58.000Z');
    expect(add.call(mockDate, 'month',2).date).to.equal('2021-11-02T01:33:58.000Z');
    expect(add.call(mockDate, 'month',3).date).to.equal('2022-02-02T01:33:58.000Z');
    expect(add.call(mockDate, 'day',1).date).to.equal('2022-02-03T01:33:58.000Z');
    expect(add.call(mockDate, 'hour',1).date).to.equal('2022-02-03T02:33:58.000Z');
    expect(add.call(mockDate, 'minute',1).date).to.equal('2022-02-03T02:34:58.000Z');
    expect(add.call(mockDate, 'second',1).date).to.equal('2022-02-03T02:34:59.000Z');
  });
});
