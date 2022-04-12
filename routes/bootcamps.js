const express = require('express');
const router = express.Router();
const {getBootcamps, getSingleBootcamp, createBootcamps,updateBootcamps, deleteBootcamps} = require('../controllers/bootcamps');

router.route('/').get(getBootcamps).post(createBootcamps);

router.route('/:id').get(getSingleBootcamp).put(updateBootcamps).delete(deleteBootcamps);

 module.exports = router;
 