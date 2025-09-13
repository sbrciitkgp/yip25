const express = require("express");
const router = express.Router();
const { getUserPanel, getParticipants, showFields, submitFields, submitParticipants } = require("../controllers/userController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const redirectLogin = require("../middlewares/redirectLogin");
const { route } = require("./mainRoutes");

router.get("/team", isLoggedIn,redirectLogin, getUserPanel);
router.get("/team/participants", isLoggedIn,redirectLogin, getParticipants);
router.post("/team/showfields", isLoggedIn,redirectLogin, showFields);
router.post("/team/submitfields",isLoggedIn,redirectLogin, submitFields);
router.post("/team/participants",isLoggedIn,redirectLogin, submitParticipants);

module.exports = router;
