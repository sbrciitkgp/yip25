// routes/mainRoutes.js
const express = require("express");
const router = express.Router();

// Homepage
router.get("/", (req, res) => {
  res.send("I'm at Home");
});

// Signup Page
router.get("/signup", (req, res) => {
  res.render("signup2");
});

// Login Page
router.get("/login", (req, res) => {
  res.render("login2");
});

// Previous Page
router.get("/previous", (req, res) => {
  res.send("I'm Previous Yip");
});

module.exports = router;
