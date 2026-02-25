const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    specialization:{
        type:String,
        required:true
    },

    experience:{
        type:Number,
        required:true
    },

    fees:{
        type:Number,
        required:true
    },

    image:{
        type:String,
        default:"https://via.placeholder.com/150"
    }

});

module.exports = mongoose.model("Doctor",doctorSchema);