const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true    //username khong trung nhau
    },
    password:{
        type: String,
        required: true
    },
    // cho biet nguoi dung tao ra luc nao
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("users", userSchema)