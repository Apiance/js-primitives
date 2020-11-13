const {expect} = require('chai');
const Instrument = require('./Instrument');

describe('Instrument', function suite() {
  let instrument;
  it('should instantiates with now as default', () => {
    const instrumentDefault = new Instrument();
    expect(instrumentDefault).to.exist;
  });
  it('should init from params', function () {
    instrument = new Instrument({
      symbol: "ABCUSD"
    });
    expect(instrument.symbol).to.deep.equal('ABCUSD');
  });
});
