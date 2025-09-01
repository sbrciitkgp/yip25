const express = require("express");
const router = express.Router();
const { getUserPanel, showFields, submitFields } = require("../controllers/userController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/userpanel", isLoggedIn, getUserPanel);
router.post("/userpanel/showfields", isLoggedIn, showFields);
router.post("/userpanel/submitfields", submitFields);

module.exports = router;
