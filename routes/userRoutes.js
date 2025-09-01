const express = require("express");
const router = express.Router();
const { getUserPanel, getParticipants, showFields, submitFields, submitParticipants } = require("../controllers/userController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const { route } = require("./mainRoutes");

router.get("/team", isLoggedIn, getUserPanel);
router.get("/team/participants", isLoggedIn, getParticipants);
router.post("/team/showfields", isLoggedIn, showFields);
router.post("/team/submitfields", submitFields);
router.post("/team/participants",isLoggedIn, submitParticipants);

module.exports = router;
