require('dotenv').config({path:'./config/config.env'});
const express = require("express");
const colors = require('colors');
const bootcamps = require('./routes/bootcamps');
const morgan = require('morgan');
const localdb = require('./config/db')

const port = process.env.PORT || 3000

const app = express();

app.use(express.json())

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

localdb();

const server = app.listen(port, ()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold);
})

app.use('/api/v1/bootcamps', bootcamps);

//handle unhandlepromiserejection

process.on('unhandledRejection',(err, promise)=>{
    console.log(`Error: ${err.message}`.red);
    
    //Close server
    server.close(()=>{
        process.exit(1)
    })
})