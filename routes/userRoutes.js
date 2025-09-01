const express = require("express");
const router = express.Router();
const { getUserPanel, showFields, submitFields, submitParticipants } = require("../controllers/userController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const { route } = require("./mainRoutes");

router.get("/userpanel", isLoggedIn, getUserPanel);
router.post("/userpanel/showfields", isLoggedIn, showFields);
router.post("/userpanel/submitfields", submitFields);
router.post("/userpanel/participants",isLoggedIn, submitParticipants);

module.exports = router;
