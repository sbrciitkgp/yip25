const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const noticeModel = require("../models/notice");
const TeamModel = require("../models/team.js");
const ResultModel = require("../models/result");
const pocModel = require("../models/poc");
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Team = require("../models/team.js");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/register", (req, res) => {
  res.render("signup", { flashMessage: null });
});

router.get("/userpanel", isLoggedIn, (req, res) => {
  res.render("userpanel",{});
});

router.get("/admin/result", isLoggedIn, async (req, res) => {
  let teams = await ResultModel.find();
  res.render("adminresult", { teams });
});

router.get("/adminpanel", isLoggedIn, async (req, res) => {

  if (req.user.Admin == true) {
    const notices = await noticeModel.find({});
    const teams = await TeamModel.find({});
    const mentors = await pocModel.find({});
    res.render("adminpanel", { notices, teams, mentors });
  } else {
    res.redirect("/userpanel");
  }
});

router.get("/login", (req, res) => {
  res.render("login", { flashMessage: null });
});

router.get("/previouseditions", (req, res) => {
  res.send("I am Previous Yip");
});

router.get("/themes", (req, res) => {
  res.render("themes");
});
router.get("/admin", (req, res) => {
  res.render("adminregister");
});

router.get("/messages", (req, res) => {
  res.render("messages");
});

router.get("/admin/teams", isLoggedIn, async (req, res) => {
  const teams = await TeamModel.find().populate("poc", "name email phone");
  res.render("teams", { teams });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

router.get("/admin/notice/:id/edit", isLoggedIn, async (req, res) => {
  const notice = await noticeModel.findById(req.params.id);
  res.render("editnotice", { notice });
});

router.get("/admin/notice/:id/delete", isLoggedIn, async (req, res) => {
  await noticeModel.findByIdAndDelete(req.params.id);
  res.redirect("/adminpanel");
});

router.get("/admin/mentors", isLoggedIn, async (req, res) => {
  try {
    const teams = await userModel.find({});
    res.render("mentors", { teams });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching teams");
  }
});

router.post("/admin/notice/:id/edit", async (req, res) => {
  const { content } = req.body;
  await noticeModel.findByIdAndUpdate(req.params.id, { content });
  res.redirect("/adminpanel");
});

router.post("/admin/result/round1", async (req, res) => {
  try {
    const teams = await TeamModel.find({});
    const qualifiedTeams = req.body.qualified || [];
    const notQualifiedTeams = teams.filter(
      (team) => !qualifiedTeams.includes(team.TeamName)
    );

    
    for (const teamName of qualifiedTeams) {
      const team = await ResultModel.findOne({ TeamName: teamName });
      if (team) {
        team.Round1 = true;
        await team.save();
      } else {
        console.log("No Team Found:", teamName);
      }
    }

    
    for (const team of notQualifiedTeams) {
      const resultTeam = await ResultModel.findOne({ TeamName: team.TeamName });
      if (resultTeam) {
        resultTeam.Round1 = false;
        await resultTeam.save();
      } else {
        console.log("No Team Found:", team.TeamName);
      }
    }

    res.redirect("/adminpanel");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
router.post("/admin/result/round2", async (req, res) => {
  try {
    const teams = await TeamModel.find({});
    const qualifiedTeams = req.body.qualified || [];
    const notQualifiedTeams = teams.filter(
      (team) => !qualifiedTeams.includes(team.TeamName)
    );

    
    for (const teamName of qualifiedTeams) {
      const team = await ResultModel.findOne({ TeamName: teamName });
      if (team) {
        team.Round2 = true;
        await team.save();
      } else {
        console.log("No Team Found:", teamName);
      }
    }

    
    for (const team of notQualifiedTeams) {
      const resultTeam = await ResultModel.findOne({ TeamName: team.TeamName });
      if (resultTeam) {
        resultTeam.Round2 = false;
        await resultTeam.save();
      } else {
        console.log("No Team Found:", team.TeamName);
      }
    }

    res.redirect("/adminpanel");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
router.post("/admin/result/round3", async (req, res) => {
  try {
    const teams = await TeamModel.find({});
    const qualifiedTeams = req.body.qualified || [];
    const notQualifiedTeams = teams.filter(
      (team) => !qualifiedTeams.includes(team.TeamName)
    );

    
    for (const teamName of qualifiedTeams) {
      const team = await ResultModel.findOne({ TeamName: teamName });
      if (team) {
        team.Round3 = true;
        await team.save();
      } else {
        console.log("No Team Found:", teamName);
      }
    }

    
    for (const team of notQualifiedTeams) {
      const resultTeam = await ResultModel.findOne({ TeamName: team.TeamName });
      if (resultTeam) {
        resultTeam.Round3 = false;
        await resultTeam.save();
      } else {
        console.log("No Team Found:", team.TeamName);
      }
    }

    res.redirect("/adminpanel");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


router.post("/userpanel/mentor", (req, res) => {
  const count = parseInt(req.body.count);
  res.render("123", { count });
});

router.post("/admin/allotpoc", isLoggedIn, async (req, res) => {
  const teams = req.body.teams;

  for (const teamdet of teams) {
    const { teamName, pocName } = teamdet;

    const team = await TeamModel.findOne({ TeamName: teamName });
    const poc = await pocModel.findOne({ name: pocName });

    if (!team || !poc) continue;

    if (!(team.poc == poc._id)) {
      team.poc = poc._id;
      await team.save();
    }

    if (!poc.teams.includes(team._id)) {
      poc.teams.push(team._id);
      await poc.save();
    }
  }
  const teams2 = await TeamModel.find();
  res.redirect("/adminpanel");
});

router.post("/admin/notice", isLoggedIn, async (req, res) => {
  let content = req.body.notice;
  let notice = await noticeModel.create({
    content,
    date: Date.now,
  });
  
  res.redirect("/adminpanel");
});

router.post("/user/create", async (req, res) => {
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

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(Password, salt, async (err, hash) => {
      let user = await userModel.create({
        TeamName,
        MentorName,
        MentorEmail,
        MentorPhone,
        SchoolName,
        SchoolPhone,
        SchoolEmail,
        Password: hash,
      });
      await ResultModel.create({
        TeamName,
        SchoolName,
      });
      res.redirect("/login");
    });
  });
});

router.post("/user/login", async (req, res) => {
  const { TeamName, Password } = req.body;

  if (TeamName === "yip26") {
    if (Password === "sbrc@yip26") {
      const token = jwt.sign({ MentorName: TeamName, Admin: true }, "shhhs");
      res.cookie("token", token);
      res.redirect("/adminpanel");
    }
    else {
      res.redirect('/login')
    }
  } else {
    const user = await userModel.findOne({ TeamName });
    if (!user) {
      return res.render("login", { flashMessage: "Team name not found" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.render("login", { flashMessage: "Incorrect Password" });
    }

    const token = jwt.sign(
      { id: user._id, MentorName: user.MentorName, Admin: user.Admin },
      "shhhs"
    );
    res.cookie("token", token);
    res.redirect("/");
  }
});

module.exports = router;
