const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const TeamModel = require("../models/team");
const Admin = require("../models/admin")
const jwt = require("jsonwebtoken");

exports.LoginAdmin = async (req, res) => {
  let { Name, Password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(Password, salt, async (err, hash) => {
      await Admin.create({
        Name,
        Password: hash,
      },);
    });
  });

  const admintoken = jwt.sign(
    { id: Admin._id, Name:Admin.Name },
    "shhhs"
  );
  res.cookie("admintoken", admintoken);
  res.redirect("/adminpanel");
};

exports.getLoginPage = (req, res) => {
  if(req.cookies.token){
    return res.redirect('team')
  }
  res.render("login", { flashMessage: null });
};

exports.getRegisterPage = (req, res) => {
  res.render("signup", { flashMessage: null });
};



exports.registerUser = async (req, res) => {
  let {
    TeamName,
    MentorName,
    MentorEmail,
    MentorPhone,
    Password,
    SchoolName,
    SchoolPhone,
    SchoolEmail,
  } = req.body;

  let user = await userModel.findOne({ MentorEmail });
  if (user) {
    return res.render("signup", {
      flashMessage: "You Already have an account",
    });
  }

  await TeamModel.create({
    TeamName,
    MentorName,
    MentorEmail,
    MentorPhone,
    SchoolName,
    SchoolPhone,
    SchoolEmail,
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(Password, salt, async (err, hash) => {
      await userModel.create({
        TeamName,
        MentorName,
        MentorEmail,
        MentorPhone,
        SchoolName,
        SchoolPhone,
        SchoolEmail,
        Password: hash,
      });

      res.redirect("/login");
    });
  });
};

exports.loginUser = async (req, res) => {
  const { TeamName, Password } = req.body;

  

  const user = await userModel.findOne({ TeamName });
  if (!user)
    return res.render("login", { flashMessage: "Team name not found" });

  const isMatch = await bcrypt.compare(Password, user.Password);
  if (!isMatch)
    return res.render("login", { flashMessage: "Incorrect Password" });

  const token = jwt.sign(
    { id: user._id, TeamName: user.TeamName, Admin: user.Admin },
    "shhhs"
  );
  res.cookie("token", token);
  res.redirect("/team");
};

exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

module.exports = exports;