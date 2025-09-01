const userModel = require("../models/user");
const noticeModel = require("../models/notice");

exports.getUserPanel = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    const notices = await noticeModel.find().sort({ createdAt: -1 });
    res.render("userpanel", { notices, user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching notices");
  }
};

exports.showFields = async (req, res) => {
  const count = parseInt(req.body.count, 10);
  const user = await userModel.findById(req.user.id);
  const notices = await noticeModel.find().sort({ createdAt: -1 });
  res.render("userpanel", { notices, user, count });
};

exports.submitFields = (req, res) => {
  console.log(req.body);
  res.send("Form submitted successfully!");
};
