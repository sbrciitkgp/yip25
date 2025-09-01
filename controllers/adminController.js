const noticeModel = require("../models/notice");
const TeamModel = require("../models/team");
const pocModel = require("../models/poc");
const ResultModel = require("../models/result");
const userModel = require("../models/user");

exports.getAdminPanel = async (req, res) => {
  if (req.user.Admin) {
    const notices = await noticeModel.find({});
    const teams = await TeamModel.find({});
    const mentors = await pocModel.find({});
    res.render("adminpanel", { notices, teams, mentors });
  } else {
    res.redirect("/userpanel");
  }
};

exports.getMentors = async (req, res) => {
  try {
    const teams = await userModel.find({});
    res.render("mentors", { teams });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching teams");
  }
};

exports.getTeams = async (req, res) => {
  const teams = await TeamModel.find().populate("poc", "name email phone");
  res.render("teams", { teams });
};
