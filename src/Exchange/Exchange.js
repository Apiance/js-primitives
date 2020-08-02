class Exchange {
  constructor(props = {}) {
    this.name = props.name || 'UnnamedExchange';
  }
  toString(){
    return this.name.toString();
  }
}
module.exports = Exchange;
