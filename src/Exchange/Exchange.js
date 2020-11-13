class Exchange {
  constructor(props = {}) {
    const { name, ...otherProps } = props;
    this.name = (name) ? name : 'UnnamedExchange';
    Object.assign(this, otherProps);
  }
  toString(){
    return this.name.toString();
  }
}
module.exports = Exchange;
