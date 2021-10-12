class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);//adds the error to the base Error class which got extended, COULD NOT FIND PLACE
    this.code = errorCode;//add code to this HttpError class, 404
  }
}

module.exports = HttpError;
