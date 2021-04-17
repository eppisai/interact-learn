const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    event:{
        type:String,
        required:true
    },
    creator:{
        type:String,
        required:true
    },
    // audio:{
    //     type:Buffer
    // }
})

module.exports = mongoose.model('Event', eventSchema)