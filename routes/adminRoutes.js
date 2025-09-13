const express = require("express");
const router = express.Router();
const { getAdminPanel, getMentors, getTeams } = require("../controllers/adminController");

const { getResults, updateRound } = require("../controllers/resultController");
const { assignPocs } = require("../controllers/pocController");
const isAdmin = require("../middlewares/isAdmin.js");
const isLoggedIn = require("../middlewares/isLoggedIn.js");


router.get("/adminpanel", isAdmin, getAdminPanel);
router.get("/admin/mentors", isAdmin, getMentors);
router.get("/admin/teams", isAdmin, getTeams);
router.get("/admin/result", isAdmin, getResults);

router.post("/admin/result/round1",isAdmin, updateRound("Round1"));
router.post("/admin/result/round2",isAdmin, updateRound("Round2"));
router.post("/admin/result/round3",isAdmin, updateRound("Round3"));

router.post("/admin/allotpoc", isAdmin, assignPocs);

module.exports = router;
