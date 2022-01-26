const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.post("/updateuser", checkAuth, UserController.user_update);

router.get("/", checkAuth, UserController.get_users);

router.get("/view-logs", checkAuth, UserController.view_logs);

module.exports = router;
