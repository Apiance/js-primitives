const initial = '2020-08-02T01:33:58.000Z';
import { describe, it, expect } from "vitest";
import set   from "./set.js";
import get   from "./get.js";
import subtract   from "./subtract.js";
import to   from "./to.js";
import Epoch   from "../Epoch.js";
describe('Epoch.subtract', function suite(){
  it('should subtract', function () {
    const mockDate = {
      date: '2020-08-02T01:33:58.000Z',
      get,
      set,
      to,
    }
    mockDate.constructor.fromNumber = Epoch.fromNumber;

    expect(subtract.call(mockDate, 'year', 1).date).to.equal('2019-08-02T01:33:58.000Z');
    expect(subtract.call(mockDate, 'month',1).date).to.equal('2019-07-02T01:33:58.000Z');
    expect(subtract.call(mockDate, 'month',2).date).to.equal('2019-05-02T01:33:58.000Z');
    expect(subtract.call(mockDate, 'month',3).date).to.equal('2019-02-02T01:33:58.000Z');
    expect(subtract.call(mockDate, 'month',3).date).to.equal('2018-11-02T01:33:58.000Z');
    expect(subtract.call(mockDate, 'day',1).date).to.equal('2018-11-01T01:33:58.000Z');
    expect(subtract.call(mockDate, 'hour',1).date).to.equal('2018-11-01T00:33:58.000Z');
    expect(subtract.call(mockDate, 'hour',1).date).to.equal('2018-10-31T23:33:58.000Z');
    expect(subtract.call(mockDate, 'minute',1).date).to.equal('2018-10-31T23:32:58.000Z');
    expect(subtract.call(mockDate, 'second',1).date).to.equal('2018-10-31T23:32:57.000Z');
  });
});
