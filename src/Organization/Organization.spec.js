import {expect, describe, it} from 'vitest';
import Organization from './Organization.js';
describe('Organization', function suite() {
  let organization;
  it('should instantiates with now as default', () => {
    const organizationDefault = new Organization();
    expect(organizationDefault).to.exist;
  });
  it('should init from params', function () {
    organization = new Organization({
      name: "SuperOrg"
    });
    expect(organization.name).to.deep.equal('SuperOrg');
  });
});
