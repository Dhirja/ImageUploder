const mongoose = require("mongoose");


const imageSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    imgpath:{
        type:String,
        required:true
    },
    date:{
        type:Date
    }
});


// create model

const images = new mongoose.model("images",imageSchema);

module.exports = images;