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
  NOTIFY: 'NOTIFY',
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
class SocketMessage {
  static ACTIONS = ACTIONS;
  constructor(action, payload) {
    this.action = action;
    this.payload = payload;
  }
  toJSON(){
    const { action, payload } = this;

    const response = {
      action, payload
    }

    return response;
  }
  toStringified(){
    return JSON.stringify(this.toJSON());
  }
};

export default SocketMessage;
