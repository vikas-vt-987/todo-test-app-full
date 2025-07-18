const User = require('../model/User.model');

// Create
const createTodo = async (req, res) => {
  try {
    const createdTodo = await User.create(req.body);
    
    res.status(200).send(createdTodo);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get all
const getTodos = async (req, res) => {
  try {
    const getTodo = await User.find();
    res.status(200).send(getTodo);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete
const deleteTodo = async (req, res) => {
  const todoId = req.params.id;
  try {
    const deletedTodo = await User.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(`User ${deletedTodo.name} deleted`);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateTodo = async (req,res)=>{
    const todoId =  req.params.id;
    const newData = req.body;
    try{
        const updatedUser = await User.findByIdAndUpdate(todoId,newData,{new:true});
        if(!updatedUser){
            res.status(400).send("user not found")
        }
        res.status(200).send(updatedUser);
    }catch(err){
        res.status(400).send("error : ", err)
    }
}

module.exports = { createTodo, getTodos, deleteTodo,updateTodo };
