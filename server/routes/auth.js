/*Xac thuc nguoi dung*/

const express = require('express');
const router = express.Router();
const argon2 = require('argon2'); //hash password
const jwt = require('jsonwebtoken');

const user = require('../models/user.model');
const { json } = require('express');

// router.get('/', (req, res) => res.send('User route'))   // '/' tuc la chi vao 'auth' thoi


// ROUTER REGISTER
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: 'Thieu Username hoac Password!' });
  try {
    // check user
    const User = await user.findOne({ username }); // tim username co trong database khong?

    if (User)
      return res.status(400).json({ success: false, message: 'Username da duoc su dung!' });

    // All good
    const hashedPassword = await argon2.hash(password); // hash pass

    const newUser = new user({ username, password: hashedPassword });
    await newUser.save(); //dua vao co so du lieu

    // return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({ success: true, messages: 'Tao User thanh cong!', accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Loi Server!' });
  }
});


// ROUTER LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // console.log(req.body)
  // console.log(username, password)
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: 'Thieu Username hoac Password!' });

  // Su dung try...catch khi bat dau lam viec voi Database.
  try {
    const User = await user.findOne({ username });

    if (!User)
      return res
        .status(400)
        .json({ succes: false, mesage: 'Username hoac Passwowd khong dung!' });

    // console.log(User.password, password)
    // validate password
    const passswordValid = await argon2.verify(User.password, password); //verify -> kiem chung

    if (!passswordValid)
      return res
        .status(400)
        .json({ success: false, message: 'Username hoac Password khong dung!' });

    // All okay => return token
    const accessToken = jwt.sign({ userId: User._id }, process.env.ACCESS_TOKEN_SECRET);
    res.json({ success: true, message: 'Dang nhap thanh cong!', accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Loi Server!' });
  }
});
module.exports = router;
