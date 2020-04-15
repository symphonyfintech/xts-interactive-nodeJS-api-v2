function CustomError(message, stack, statusCode, fileName, lineNumber) {
    var instance ={};
    instance.name = 'CustomError';
    instance.error = {"statusCode": statusCode,"message": message, "stack": stack};
    // Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    // if (Error.captureStackTrace) {
    //   Error.captureStackTrace(instance, CustomError);
    // }
    return instance;
  }
  
  CustomError.prototype = Object.create(Error.prototype, {
    constructor: {
      value: Error,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  
  if (Object.setPrototypeOf){
    Object.setPrototypeOf(CustomError, Error);
  } else {
    CustomError.__proto__ = Error;
  }

  module.exports=CustomError;