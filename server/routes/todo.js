const express = require('express');
const router = express.Router();

const todo = require('../models/todo.model');
const userModel = require('../models/user.model');

// route POST
router.post('/', async (req, res) => {
  const user = req.user;
  
  const { title, description, url, status } = req.body;
  
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: 'Title khong duoc trong!' });
  const newTodo = new todo({
    title,
    description,
    url: url.startsWith('https://') ? url : `https://${url}`,
    status: status || 'To Learn',
    user: user.userId,
  });
  await newTodo.save();
  await userModel.findByIdAndUpdate(user.userId, {
    $push: {
      todos: newTodo._id,
    },
  });
  return res.status(200).json('success');
});

// route GET
// router.get('/', async(req, res) => {
//     const user = req.user;
//     const todos = await todo.find({user: user.userId})
//     res.json({success: true, todos})
// })

// route PUT
router.put('/:id', async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title)
    return res
      .status(400)
      .json({ success: false, message: 'Title khong duoc trong!' });

  try {
    let updatedTodo = {
      title,
      description: description || '',
      url: (url.startsWith('https://') ? url : `https://${url}`) || '',
      status: status || 'To Learn',
    };
    console.log(req.user);

    const updatedTodoCondition = {_id: req.params.id, user: req.user.userId} //dieu kien de update todo
    //{new: true}=> neu sua thi update, k thi thoi

    updatedTodo = await todo.findOneAndUpdate(updatedTodoCondition, updatedTodo,{
      new: true,
    });
    

    if (!updatedTodo)
      return res
        .status(401)
        .json({
          success: false,
          message: 'Khong tim thay todo hoac nguoi dung khong cho phep!',
        });
        
    res.json({
      success: true,
      message: 'Update thanh cong',
      todo: updatedTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Loi server!' });
  }
});

// router DELETE
router.delete('/:id', async (req, res) => {
    try {
        const deletedTodoCondition = {_id: req.params.id, user: req.user.userId} //dieu kien de delete todo
        const deletedTodo = await todo.findOneAndDelete(deletedTodoCondition);
        if (!deletedTodo)
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Khong tim thay todo hoac nguoi dung khong cho phep!',
                });
        res.json({
            success: true,
            message: 'Xoa thanh cong'})

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Loi server!' });
    }
});

module.exports = router;
