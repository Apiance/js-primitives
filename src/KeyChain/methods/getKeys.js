module.exports = function getKeys(name) {
  if (!this.keys[name]) throw new Error(`No existing keys for ${name}`);

  return this.keys[name];
};
