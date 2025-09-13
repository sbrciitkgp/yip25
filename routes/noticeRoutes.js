const express = require("express");
const router = express.Router();
const { createNotice, editNoticePage, editNotice, deleteNotice } = require("../controllers/noticeController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");

router.post("/admin/notice", isAdmin, createNotice);
router.get("/admin/notice/:id/edit", isAdmin, editNoticePage);
router.post("/admin/notice/:id/edit", isAdmin,editNotice);
router.get("/admin/notice/:id/delete", isAdmin, deleteNotice);

module.exports = router;
