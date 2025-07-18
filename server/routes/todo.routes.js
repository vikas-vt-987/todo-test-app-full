const express = require("express");
var router = express.Router();
const {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo
} = require("../controllers/todo.controller");

router.post("/check", createTodo);
router.get("/check", getTodos);
router.delete("/check/:id", deleteTodo);
router.put("/check/:id", updateTodo);

module.exports = router;
