const ACTIONS = {
  APPLY: 'APPLY',
  AUTHENTICATE: 'AUTHENTICATE',
  AUTHORIZE: "AUTHORIZE",
  DELETE: 'DELETE',
  EXECUTE: 'EXECUTE',
  FETCH: 'FETCH',
  GET: 'GET',
  LIST: 'LIST',
  MODIFY: 'MODIFY',
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
  RESTART: 'RESTART',
  SET: 'SET',
  START: 'START',
  STOP: 'STOP',
  SUBSCRIBE: 'SUBSCRIBE',
  UNSUBSCRIBE: 'UNSUBSCRIBE',
  VALIDATE: "VALIDATE"
}
class Command {
  static ACTIONS = ACTIONS;
  constructor(serviceID, action, context, opts) {
    this.serviceID = serviceID;
    this.action = action;
    this.context = context;
    this.opts = opts;
  }
  toJSON(){
    const { serviceID, action, context, opts } = this;

    const response = {
      serviceID, action, context
    }
    if(opts){
      response.opts = opts;
    }
    return response;
  }
  toStringified(){
    return JSON.stringify(this.toJSON());
  }
};
module.exports = Command;
