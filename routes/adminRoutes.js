const express = require("express");
const router = express.Router();
const { getAdminPanel, getMentors, getTeams } = require("../controllers/adminController");
const { getResults, updateRound } = require("../controllers/resultController");
const { assignPocs } = require("../controllers/pocController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/adminpanel", isLoggedIn, getAdminPanel);
router.get("/admin/mentors", isLoggedIn, getMentors);
router.get("/admin/teams", isLoggedIn, getTeams);
router.get("/admin/result", isLoggedIn, getResults);

router.post("/admin/result/round1", updateRound("Round1"));
router.post("/admin/result/round2", updateRound("Round2"));
router.post("/admin/result/round3", updateRound("Round3"));

router.post("/admin/allotpoc", isLoggedIn, assignPocs);

module.exports = router;
