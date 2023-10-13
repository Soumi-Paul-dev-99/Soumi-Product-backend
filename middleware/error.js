const ErrorHandeler = require("../utils/errorHandeler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";

  //wrong mongodb id error
  if(err.name==="CastError"){
    const message= (`resource not found . invalid ${err.path}`)
    err=new ErrorHandeler(message,400)
  }

  res.status(err.statusCode).json({
    sucess: false,
    message: err.message,
  });
};
