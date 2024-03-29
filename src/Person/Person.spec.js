import {expect, describe, it} from 'vitest';
import Person from './Person.js';
describe('Person', function suite() {
  let person;
  it('should instantiates with now as default', () => {
    const personDefault = new Person();
    expect(personDefault).to.exist;
  });
  it('should init from params', function () {
    person = new Person({
      firstName: "Alice"
    });
    expect(person.firstName).to.deep.equal('Alice');
  });
});
