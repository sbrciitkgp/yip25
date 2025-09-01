const express = require("express");
const router = express.Router();
const { LoginAdmin } = require("../controllers/authController");
const { getLoginPage, getRegisterPage, registerUser, loginUser, logoutUser } = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/admin/login", (req,res)=>{res.render('adminlogin')});
router.get("/login",getLoginPage);
router.get("/register", getRegisterPage);


router.post("/admin/create",LoginAdmin);
router.post("/user/create", registerUser);
router.post("/user/login", loginUser);
router.get("/logout", logoutUser);

module.exports = router;
