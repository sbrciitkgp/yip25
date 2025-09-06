const express = require("express");
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn')

router.get("/",isLoggedIn, (req, res) => res.render("home"));
router.get("/themes",isLoggedIn, (req, res) => res.render("themes"));
router.get("/messages",isLoggedIn, (req, res) => res.render("messages"));
router.get("/previous-editions",isLoggedIn, (req, res) => res.render("previousyip"));

module.exports = router;
