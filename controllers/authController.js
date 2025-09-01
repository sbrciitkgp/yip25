const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getLoginPage = (req, res) => {
  res.render("login", { flashMessage: null });
};

exports.getRegisterPage = (req, res) => {
  res.render("signup", { flashMessage: null });
};

exports.registerUser = async (req, res) => {
  let { TeamName, MentorName, MentorEmail, MentorPhone, Password, SchoolName, SchoolPhone, SchoolEmail } = req.body;

  let user = await userModel.findOne({ MentorEmail });
  if (user) {
    return res.render("signup", { flashMessage: "You Already have an account" });
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(Password, salt, async (err, hash) => {
      await userModel.create({
        TeamName, MentorName, MentorEmail, MentorPhone, SchoolName, SchoolPhone, SchoolEmail,
        Password: hash,
      });
      res.redirect("/login");
    });
  });
};

exports.loginUser = async (req, res) => {
  const { TeamName, Password } = req.body;

  if (TeamName === "yip26" && Password === "sbrc@yip26") {
    const token = jwt.sign({ MentorName: TeamName, Admin: true }, "shhhs");
    res.cookie("token", token);
    return res.redirect("/adminpanel");
  }

  const user = await userModel.findOne({ TeamName });
  if (!user) return res.render("login", { flashMessage: "Team name not found" });

  const isMatch = await bcrypt.compare(Password, user.Password);
  if (!isMatch) return res.render("login", { flashMessage: "Incorrect Password" });

  const token = jwt.sign({ id: user._id, MentorName: user.MentorName, Admin: user.Admin }, "shhhs");
  res.cookie("token", token);
  res.redirect("/userpanel");
};

exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};
