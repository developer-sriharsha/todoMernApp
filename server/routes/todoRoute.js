const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoControllers")
const checkAuth = require('../middleware/check-auth');

router.get("/", checkAuth, todoController.getUserTodos);
router.post("/createtodo", checkAuth, todoController.createUserTodo);
router.post("/updatetodo", checkAuth, todoController.updateUserTodo);
router.post("/deletetodo", checkAuth, todoController.deleteUserTodo);
router.post("/alluserstodos", checkAuth, todoController.getAllUsersTodos);


module.exports = router;