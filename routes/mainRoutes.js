const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.render("home"));
router.get("/themes", (req, res) => res.render("themes"));
router.get("/admin", (req, res) => res.render("adminregister"));
router.get("/messages", (req, res) => res.render("messages"));
router.get("/previouseditions", (req, res) => res.send("I am Previous Yip"));

module.exports = router;
