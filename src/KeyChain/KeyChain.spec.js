const { expect } = require('chai');
const KeyChain = require('./KeyChain');
const Keys = require('../Keys/Keys');

describe('KeyChain', function suite(){
  this.timeout(4000);
  let keyChain;
  const Binance = new Keys('Binance',{
    api: "12345qer",
    secret: "abcde12fg"
  })
  it('should instantiates', ()=>{
    keyChain = new KeyChain();
    expect(keyChain).to.exist;
  })
  it('should add new API Keys', function () {

    keyChain.addKeys(Binance);
    expect(keyChain.keys['Binance'].public).to.equal(Binance.getPublic());
    expect(keyChain.keys['Binance'].private).to.equal(Binance.getPrivate());
  });
  it('should get API Keys', function () {
    expect(()=> keyChain.getKeys('Bin')).to.throw('No existing keys for Bin')

    const keys = keyChain.getKeys('Binance');
    expect(keys.public).to.equal(Binance.getPublic());
    expect(keys.private).to.equal(Binance.getPrivate());
  });
});
