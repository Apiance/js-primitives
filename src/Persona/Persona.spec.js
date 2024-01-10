import { describe,it, expect} from "vitest";
import Persona from './Persona.js';
describe('Persona', function suite() {
  let persona;
  it('should instantiates with now as default', () => {
    const personaDefault = new Persona();
    expect(personaDefault).to.exist;
  });
  it('should init from params', function () {
    persona = new Persona({
      name: "Alice"
    });
    expect(persona.name).to.deep.equal('Alice');
  });
});
