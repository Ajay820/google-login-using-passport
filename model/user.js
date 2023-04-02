const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    name:String,
    googleID:String,
    email:String
})

module.exports = mongoose.model("user" , userschema)