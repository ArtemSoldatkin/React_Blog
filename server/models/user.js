const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: String
})

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('user', userSchema)
