const express = require('express')
const router = express.Router()

const todo = require('../models/todo.model')
const userModel = require('../models/user.model')

router.post('/', async(req, res) =>{
    const user = req.user;
    const {title, description, url, status} = req.body;
    if(!title)
    return res.status(400).json({success: false, message: 'Title khong duoc trong!'})
    const newTodo = new todo({
        title, 
        description, 
        url: url.startsWith('https://')? url : `https://${url}`, 
        status: status || 'To Learn',
        user: user.userId
    })
    await newTodo.save();
    await userModel.findByIdAndUpdate(user.userId, {
        $push: {
            todos: newTodo._id
        }
    })
    return res.status(200).json("success");

})

module.exports = router;