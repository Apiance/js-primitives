class EventMessage {
  constructor(type, payload) {
    this.type = type;
    this.payload = payload;
  }

  toJSON() {
    const {type, payload} = this;
    return {
      type,
      payload
    }
  }

  getPayload() {
    return this.payload;
  }

  getType() {
    return this.type;
  }
  toStringified(){
    return JSON.stringify(this.toJSON())
  }
};
export default EventMessage;
