const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (error, req, res, next)=>{
    let err = {...error}
    err.message = error.messag;

    console.log(error.stack.red)

    if(error.name === 'CastError'){
        const message = `Resource not found with id of ${error.value}`;

        err = new ErrorResponse(message, 404)

    }
    res.status(error.statusCode || 500).json({sucess:false, error: error.message || 'Server Error'})
}

module.exports = errorHandler;