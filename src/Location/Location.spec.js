const {expect} = require('chai');
const Location = require('./Location');

describe('Location', function suite() {
  let location;
  it('should instantiates with now as default', () => {
    const locationDefault = new Location();
    expect(locationDefault).to.exist;
  });
  it('should init from params', function () {
    location = new Location({
      type: "Street"
    });
    expect(location.type).to.deep.equal('Street');
  });
});
