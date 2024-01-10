import {expect, describe, it} from 'vitest';
import Asset from './Asset.js';
describe('Asset', function suite() {
  let asset;
  it('should instantiates with now as default', () => {
    const assetDefault = new Asset();
    expect(assetDefault).to.exist;
    expect(assetDefault.name).to.equal(null);
    expect(assetDefault.isoCode).to.equal(null);
  });
  it('should init from params', function () {
    asset = new Asset({
      name: "Bitcoin"
    });
    expect(asset.name).to.deep.equal('Bitcoin');
    expect(asset.isoCode).to.deep.equal(null);
    const asset2 = new Asset({
      name: 'Bitcoin',
      isoCode: 'BTC'
    })
    expect(asset2.name).to.deep.equal('Bitcoin');
    expect(asset2.isoCode).to.deep.equal('BTC');
    const asset3 = new Asset({
      name: 'Dash',
      isoCode: 'DASH'
    })
    expect(asset3.name).to.deep.equal('Dash');
    expect(asset3.isoCode).to.deep.equal('DASH');

    const asset4 = new Asset({
      name: 'Dash',
      isoCode: 'dash',
      moreStuff: true
    })
    expect(asset4.name).to.deep.equal('Dash');
    expect(asset4.isoCode).to.deep.equal('DASH');
    expect(asset4.moreStuff).to.deep.equal(true);
  });

});
