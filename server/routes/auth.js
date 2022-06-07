/*Xac thuc nguoi dung*/

const express = require("express")
const router = express.Router()
const argon2 = require("argon2") //hash password
const jwt = require("jsonwebtoken")

const user = require('../models/user.model')
const { json } = require("express")

// router.get('/', (req, res) => res.send('User route'))   // '/' tuc la chi vao 'auth' thoi

router.post('/register', async(req, res) => {
    const {username, password} = req.body;

    if(!username || !password)
    return res.status(400).json({success: false, message: 'Missing Username or Password'})
    try {
        // check user
        const User = await user.findOne({username})

        if (User)
        return res.status(400).json({success: false, message: 'Username already taken'})

        // hash pass
        const hashedPassword = await argon2.hash(password)

        const newUser = new user({username, password: hashedPassword})
        await newUser.save()    //dua vao co so du lieu

        // return token
        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)

        res.json({success: true, messages: 'User created success', accessToken})
    } catch (error) {
        
    }

})
module.exports = router
