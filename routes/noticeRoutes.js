const express = require("express");
const router = express.Router();
const { createNotice, editNoticePage, editNotice, deleteNotice } = require("../controllers/noticeController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.post("/admin/notice", isLoggedIn, createNotice);
router.get("/admin/notice/:id/edit", isLoggedIn, editNoticePage);
router.post("/admin/notice/:id/edit", editNotice);
router.get("/admin/notice/:id/delete", isLoggedIn, deleteNotice);

module.exports = router;
