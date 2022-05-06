const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (error, req, res, next)=>{
    let err = {...error}
    err.message = error.message;

    console.log('line 7: ',err);

    if(error.name === 'CastError'){
        const message = `Resource not found with id of ${error.value}`;

        err = new ErrorResponse(message, 404)

    }

    if(err.code === 11000){
        const message = 'Duplicate field value entered';
        err = new ErrorResponse(message, 400)
    }

    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(value => value.message);
        err = new ErrorResponse(message, 400);
    }
    res.status(err.statusCode || 500).json({success:false, err: err.message || 'Server Error'})
}

module.exports = errorHandler;