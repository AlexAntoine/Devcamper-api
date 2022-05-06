const bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Geocoder = require('../utils/geocoder');

// @desc   Get all bootcamps
// @route  Get /api/v1/bootcamps
// @access Public

exports.getBootcamps = asyncHandler(async(req, res, next)=>{
    const result = await bootcamp.find();
    
    res.status(200).json({success:true, count: result.length, data:result});
   
   
});

// @desc   Get single bootcamp
// @route  Get /api/v1/bootcamps/:id
// @access Public

exports.getSingleBootcamp = asyncHandler(async(req, res, next)=>{
    
    const result = await bootcamp.findById(req.params.id);
    
    if(!result){
        next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({success:true, data:result})
   
});

// @desc   Create new bootcamp
// @route  POST /api/v1/bootcamps
// @access Private

exports.createBootcamps = asyncHandler(async(req, res, next)=>{
  
    const result = await bootcamp.create(req.body);

    res.status(201).json({success:true, data: result});
   
});

// @desc   Update bootcamp
// @route  PUT /api/v1/bootcamps/:id
// @access Private

exports.updateBootcamps = asyncHandler(async(req, res, next)=>{

    const result = await bootcamp.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true});

    if(!result){
        next(new ErrorResponse(`Bootcamps not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({sucess:true,data:result});
});

// @desc   Delete bootcamp
// @route  DELETE /api/v1/bootcamps/:id
// @access Private

exports.deleteBootcamps = asyncHandler(async(req, res, next)=>{

  
    const result = await bootcamp.findByIdAndDelete(req.params.id);

    if(!result){
        next(error)
    }
    res.status(200).json({sucess:true,data: {}});
        
   
});

// @desc   GET bootcamp within a radius
// @route  DELETE /api/v1/bootcamps/radius/:zipcode/:distance
// @access Private

exports.getBootcampsInRadius = asyncHandler(async(req, res, next)=>{
    const {zipcode, distance} = req.params;

    //Get Lat and Long from Geocoder
    const loc = await Geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude

    //Calulate radius using radians
    // Divide distance by radius of earth
    //earth radius 3963 miles, 6378 km

    const radius = distance / 3963 

    const bootcamps = await bootcamp.find({
        location: {$geoWithin: {$centerSphere:[[lng,lat], radius]}}
    });

    res.status(200).json({success:true, count: bootcamps.length, data:bootcamps});
    
});