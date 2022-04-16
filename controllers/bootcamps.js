const bootcamps = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
// @desc   Get all bootcamps
// @route  Get /api/v1/bootcamps
// @access Public

exports.getBootcamps = asyncHandler(async(req, res, next)=>{
    const result = await bootcamps.find();

    res.status(200).json({sucess:true, count: bootcamps.length, data:result});
   
   
});

// @desc   Get single bootcamp
// @route  Get /api/v1/bootcamps/:id
// @access Public

exports.getSingleBootcamp = asyncHandler(async(req, res, next)=>{
    
    const result = await bootcamps.findById(req.params.id);
    
    if(!result){
        next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({success:true, data:result})
   
});

// @desc   Create new bootcamp
// @route  POST /api/v1/bootcamps
// @access Private

exports.createBootcamps = asyncHandler(async(req, res, next)=>{
  
    const result = await bootcamps.create(req.body);

    res.status(201).json({sucess:true, data: result});
   
});

// @desc   Update bootcamp
// @route  PUT /api/v1/bootcamps/:id
// @access Private

exports.updateBootcamps = asyncHandler(async(req, res, next)=>{

    const result = await bootcamps.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true});

    if(!result){
        next(new ErrorResponse(`Bootcamps not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({sucess:true,data:result});
});

// @desc   Delete bootcamp
// @route  DELETE /api/v1/bootcamps/:id
// @access Private

exports.deleteBootcamps = asyncHandler(async(req, res, next)=>{

  
    const result = await bootcamps.findByIdAndDelete(req.params.id);

    if(!result){
        next(error)
    }
    res.status(200).json({sucess:true,data: {}});
        
   
});