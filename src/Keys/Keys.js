class Keys {
  constructor(name, props) {
    if(props){
      if(props.api || props.public) {
        this.public = props.public || props.api;
      }
      if(props.private || props.secret){
        this.private = props.private || props.secret;
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
