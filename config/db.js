// require('dotenv').config({path:'./config/config.env'});
const mongoose = require('mongoose');

const localdb = async()=>{
   const connect = await mongoose.connect(process.env.LOCALDB, {useNewUrlParser:true, useUnifiedTopology: true})
   console.log('Database connected'.cyan.underline.bold);
}

module.exports = localdb;