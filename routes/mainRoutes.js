const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.get("/", (req, res) => {
  res.send("I am Home");
});


router.get("/register", (req, res) => {
  res.render("signup", { flashMessage: null });
});

router.get("/login", (req, res) => {
  res.render("login", { flashMessage: null });
});


router.get("/previous", (req, res) => {
  res.send("I am Previous Yip");
});


router.get("/themes", (req, res) => {
  res.send("I am Themes");
});


router.get("/messages", (req, res) => {
  res.render("messages");
});


router.post("/user/create", async (req, res) => {
  let { TeamName, MentorName, MentorEmail, MentorPhone, Password } = req.body;
  let user = await userModel.findOne({ MentorEmail });

  if (user) {
    return res.render("signup", { flashMessage: "You Already have an account" });
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(Password, salt, async (err, hash) => {
      await userModel.create({
        TeamName,
        MentorName,
        MentorEmail,
        MentorPhone,
        Password: hash,
      });
      res.redirect("/login");
    });
  });
});


router.post("/user/login", async (req, res) => {
  const { TeamName, Password } = req.body;

  const user = await userModel.findOne({ TeamName });
  if (!user) {
    return res.render("login", { flashMessage: "Team name not found" });
  }

  const isMatch = await bcrypt.compare(Password, user.Password);
  if (!isMatch) {
    return res.render("login", { flashMessage: "Incorrect Password" });
  }

  const token = jwt.sign({ id: user._id, MentorName: user.MentorName }, "shhhs");
  res.cookie("token", token);
  res.redirect("/");
});

module.exports = router;
