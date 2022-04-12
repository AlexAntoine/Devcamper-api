const bootcamps = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse')
// @desc   Get all bootcamps
// @route  Get /api/v1/bootcamps
// @access Public

exports.getBootcamps = async(req, res, next)=>{
    try {
        const result = await bootcamps.find();

        res.status(200).json({sucess:true, count: bootcamps.length, data:result});
    } catch (error) {
        next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }
   
}

// @desc   Get single bootcamp
// @route  Get /api/v1/bootcamps/:id
// @access Public

exports.getSingleBootcamp = async(req, res, next)=>{
    try {
        const result = await bootcamps.findById(req.params.id);
        
        if(!result){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
        }

        res.status(200).json({success:true, data:result})
    } catch (error) {

        next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }
}

// @desc   Create new bootcamp
// @route  POST /api/v1/bootcamps
// @access Private

exports.createBootcamps = async(req, res, next)=>{
    try {
        const result = await bootcamps.create(req.body);

        res.status(201).json({sucess:true, data: result});
        
    } catch (error) {
        next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 400))
    }
   
}

// @desc   Update bootcamp
// @route  PUT /api/v1/bootcamps/:id
// @access Private

exports.updateBootcamps = async(req, res, next)=>{

    try {
        const result = await bootcamps.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true});

        if(!result){
            return res.status(400).json({sucess:false})
        }
        res.status(200).json({sucess:true,data:result});
        
    } catch (error) {
        next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 400))
    }
   
}

// @desc   Delete bootcamp
// @route  DELETE /api/v1/bootcamps/:id
// @access Private

exports.deleteBootcamps = async(req, res, next)=>{

    try {
        const result = await bootcamps.findByIdAndDelete(req.params.id);

        if(!result){
            return res.status(400).json({sucess:false})
        }
        res.status(200).json({sucess:true,data: {}});
        
    } catch (error) {
        next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 400))
    }
}