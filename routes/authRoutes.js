const express = require("express");
const router = express.Router();
const { getLoginPage, getRegisterPage, registerUser, loginUser, logoutUser } = require("../controllers/authController");

router.get("/login", getLoginPage);
router.get("/register", getRegisterPage);
router.post("/user/create", registerUser);
router.post("/user/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;
