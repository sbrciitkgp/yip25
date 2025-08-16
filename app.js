const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const bcrypt = require("bcrypt");
const path = require("path");
const userModel = require("./models/user");
const mongoose = require("mongoose");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("I am Home");
});

app.get("/register", (req, res) => {
  res.render("signup",{ flashMessage: null });
});
app.get("/login",(req, res) => {
  res.render("login",{flashMessage:null});
});

app.get("/previous", (req, res) => {
  res.send("I am Previous Yip");
});

app.get("/themes", (req, res) => {
  res.send("I am Themes");
});
app.get("/messages", (req, res) => {
  res.send("I am Messages ");
});
app.post("/user/create", async (req, res) => {
  let { TeamName, MentorName, MentorEmail, MentorPhone, Password } = req.body;
  let user = await userModel.findOne({ MentorEmail });
  if (user) {
    return res.render("signup",{ flashMessage: "You Already have an account" });
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(Password, salt, async (err, hash) => {
        let CreatedUser = await userModel.create({
          TeamName,
          MentorName,
          MentorEmail,
          MentorPhone,
          Password: hash,
        });
        res.redirect("/login");
      });
    });
  }
});
app.post("/user/login", async (req, res) => {
  const { TeamName, Password } = req.body;

  const user = await userModel.findOne({ TeamName });
  if (!user) {
    return res.render("login",{ flashMessage: "Team name not found" });
  }

  const isMatch = await bcrypt.compare(Password, user.Password);
  if (!isMatch) {
    return res.render("login",{ flashMessage: "Incorrect Password" });
  }

  const token = jwt.sign({ id: user._id, MentorName: user.MentorName }, "shhhs");
  res.cookie("token", token);
  res.redirect("/"); 
});

app.listen(3000);
