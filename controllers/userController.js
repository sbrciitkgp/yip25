const userModel = require("../models/user");
const noticeModel = require("../models/notice");
const TeamModel = require("../models/team");

exports.getUserPanel = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    const notices = await noticeModel.find().sort({ createdAt: -1 });
    const team = await TeamModel.findOne({TeamName:user.TeamName}).populate("poc");
    console.log(team)

    const success = req.flash("success");
    const error = req.flash("error");

    res.render("userpanel", { notices, user, success, error,team });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching notices");
  }
};

exports.getParticipants = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    await noticeModel.find().sort({ createdAt: -1 }); // (not used here but still fetching)
    res.render("participants", { user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching notices");
  }
};

exports.showFields = async (req, res) => {
  try {
    const count = parseInt(req.body.count, 10);
    const user = await userModel.findById(req.user.id);
    const notices = await noticeModel.find().sort({ createdAt: -1 });
    res.render("userpanel", { notices, user, count });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error showing fields");
  }
};

exports.submitParticipants = async (req, res) => {
  try {
    const user = req.user;
    const { participantName, participantemail, participantPhone, grade } = req.body;

    // Map arrays into members
    const members = participantName
      .map((name, i) => {
        if (name && participantemail[i] && participantPhone[i] && grade[i]) {
          return {
            participantName: name,
            participantEmail: participantemail[i],
            participantPhone: participantPhone[i],
            grade: grade[i],
          };
        }
        return null;
      })
      .filter((m) => m !== null);

    // Update team with members
    const updatedTeam = await TeamModel.findOneAndUpdate(
      { TeamName: user.TeamName }, // filter
      { $set: { Members: members } }, // update
      { new: true } // return updated doc
    );

    if (!updatedTeam) {
      req.flash("error", "Team not found");
      return res.redirect("/team");
    }

    req.flash("success", "Participants Registered Successfully");
    res.redirect("/team");
  } catch (error) {
    console.error("Error submitting participants:", error);
    req.flash("error", "Error Registering Participants");
    res.redirect("/team");
  }
};

exports.submitFields = (req, res) => {
  console.log(req.body);
  res.send("Form submitted successfully!");
};
