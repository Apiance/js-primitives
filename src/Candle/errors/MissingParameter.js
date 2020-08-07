class MissingParameter extends Error {
  constructor(parameterName, parameters) {
    super(`Missing parameter ${parameterName}. Supplied: ${JSON.stringify(parameters)}`);
  }
};
module.exports = MissingParameter;
