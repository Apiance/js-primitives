class Asset {
  constructor(props = {}) {
    const { name, isoCode, ...otherProps } = props;
    this.name = (name) ? name : null;
    // ISO 4217 of currency
    this.isoCode = (isoCode) ? isoCode.toUpperCase() : null;
    Object.assign(this, otherProps);
  }
};

export default Asset;
