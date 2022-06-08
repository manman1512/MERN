const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true  //can thiet
    },
    description:{
        type: String,
    },
    url:{
        type: String
    },
    status:{
        type: String,
        enum: ['To Learn', 'Learning', 'Learnt']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = mongoose.model("todos", todoSchema)