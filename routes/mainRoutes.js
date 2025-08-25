const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const noticeModel = require("../models/notice");
const pocModel = require("../models/poc");
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.render("main");
});

router.get("/register", (req, res) => {
  res.render("signup", { flashMessage: null });
});

router.get('/userpanel', (req, res) => {
  res.render("userpanel",);
});


router.get("/adminpanel",isLoggedIn, async (req, res) => {
  console.log(req.user)
  if(req.user.Admin == true)
  {
  const notices = await noticeModel.find({});
  const teams = await userModel.find({});
  const mentors = await pocModel.find({});
  res.render("adminpanel", { notices, teams, mentors });
  }
  else 
  {
    res.redirect('/userpanel')
  }
});

router.get("/login", (req, res) => {
  res.render("login", { flashMessage: null });
});

router.get("/previous", (req, res) => {
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

router.get("/adminpanel/teams", (req, res) => {
  res.render("teams");
});


router.get("/admin/notice/:id/edit", async (req, res) => {
  const notices = await noticeModel.findById(req.params.id);
  console.log(notices);
  res.render("adminpanel", { notices });
});

router.get("/admin/notice/:id/delete", async (req, res) => {
  await noticeModel.findByIdAndDelete(req.params.id);
  res.redirect("/adminpanel");
});

router.get("/admin/mentors", async (req, res) => {
  try {
    const teams = await userModel.find({});
    res.render("mentors", { teams });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching teams");
  }
});

router.post("/userpanel/mentor", (req, res) => {
  const count = parseInt(req.body.count);
  res.render("123", { count });
});

router.post("/admin/allotpoc", async (req, res) => {
  const { team, poc } = req.body;

  const teamDoc = await userModel.findOne({ TeamName: team });
  const pocDoc = await pocModel.findOne({ name: poc });

  if (!teamDoc || !pocDoc) {
    return res.status(404).send("Team or POC not found");
  }

  teamDoc.poc = pocDoc._id;
  await teamDoc.save();

  pocDoc.teams.push(teamDoc._id);
  await pocDoc.save();
  res.redirect("/adminpanel");
});

router.post("/admin/notice", async (req, res) => {
  let content = req.body.notice;
  let notice = await noticeModel.create({
    content,
    date: Date.now,
  });
  console.log(notice);
  res.redirect("/adminpanel");
});

router.post("/user/create", async (req, res) => {
  let { TeamName, MentorName, MentorEmail, MentorPhone, Password } = req.body;
  let user = await userModel.findOne({ MentorEmail });

  if (user) {
    return res.render("signup", {
      flashMessage: "You Already have an account",
    });
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

  if (TeamName === "yip26") {
    if (Password === "sbrc@yip26") {
      const token = jwt.sign({ MentorName: TeamName, Admin: true }, "shhhs");
      res.cookie("token", token);
      res.redirect('/adminpanel')
    }
  }
  
  else {
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
