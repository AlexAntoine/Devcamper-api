const dotenv = require('dotenv').config({path:'./config/config.env'});
const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const bootcamp = require('./models/Bootcamp');

mongoose.connect(process.env.LOCALDB, {useNewUrlParser:true, useUnifiedTopology: true})

//READ JSON Files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

// Import into DB

const importData = async()=>{

    try {
        await bootcamp.create(bootcamps);

        console.log('Data imported...'.green.inverse)

        process.exit(1);
    } catch (error) {

        console.log(error);
    }
}

//Delete Data

const deleteData = async()=>{

    try {
        await bootcamp.deleteMany();

        console.log('Data destroyed...'.red.inverse)

        process.exit(1);
    } catch (error) {

        console.log(error);
    }
}

if(process.argv[2] == '-i'){
    importData();
}else if(process.argv[2] == '-d'){
    deleteData();
}
