const { expect } = require('chai');
const Epoch = require('./Epoch');

describe('Epoch', function suite(){
  let epoch;
  let controlDate;

  it('should instantiates with now as default', ()=>{
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
    expect(epoch.to('ms')).to.lte(controlDate.valueOf()+10);

    expect(epoch.to('milliseconds')).to.equal(epoch.to('ms'));

    expect(epoch.to('s')).to.equal(Math.ceil(epoch.to('ms')/1000));
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

  });
  it('should get format', function () {
    const epoch = new Epoch('2020-08-02T00:33:58.000Z')
    const year = epoch.format('YYYY');
    expect(year).to.equal('2020');
    const month =  epoch.format('MM');
    expect(month).to.equal('08');
    const day =  epoch.format('DD');
    expect(day).to.equal('02');
    expect(epoch.format('hh')).to.equal('00');
    expect(epoch.format('mm')).to.equal('33');
    expect(epoch.format('ss')).to.equal('58');
  });
});
