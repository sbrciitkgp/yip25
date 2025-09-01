const noticeModel = require("../models/notice");

exports.createNotice = async (req, res) => {
  await noticeModel.create({ content: req.body.notice, date: Date.now });
  res.redirect("/adminpanel");
};

exports.editNoticePage = async (req, res) => {
  const notice = await noticeModel.findById(req.params.id);
  res.render("editnotice", { notice });
};

exports.editNotice = async (req, res) => {
  const { content } = req.body;
  await noticeModel.findByIdAndUpdate(req.params.id, { content });
  res.redirect("/adminpanel");
};

exports.deleteNotice = async (req, res) => {
  await noticeModel.findByIdAndDelete(req.params.id);
  res.redirect("/adminpanel");
};
