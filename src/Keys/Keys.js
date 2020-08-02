class Keys {
  constructor(name, opts) {
    if(opts){
      if(opts.api) {
        this.public = opts.api;
      }
      if(opts.private || opts.secret){
        this.private = opts.private || opts.secret;
      }
    }
    this.name = name;

    Object.defineProperty(this, 'private', {
      writable: true,
      enumerable: false,
    });
    Object.defineProperty(this, 'public', {
      writable: true,
      enumerable: false,
    });
  }
};
Keys.prototype.getPrivate=function(){
  return this.private;
}
Keys.prototype.getPublic=function(){
  return this.public;
}
module.exports = Keys;
