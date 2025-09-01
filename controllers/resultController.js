const ResultModel = require("../models/result");
const TeamModel = require("../models/team");

exports.getResults = async (req, res) => {
  const teams = await ResultModel.find();
  res.render("adminresult", { teams });
};

exports.updateRound = (round) => async (req, res) => {
  try {
    const teams = await TeamModel.find({});
    const qualified = req.body.qualified || [];
    const notQualified = teams.filter(t => !qualified.includes(t.TeamName));

    for (const name of qualified) {
      const team = await ResultModel.findOne({ TeamName: name });
      if (team) {
        team[round] = true;
        await team.save();
      }
    }

    for (const team of notQualified) {
      const result = await ResultModel.findOne({ TeamName: team.TeamName });
      if (result) {
        result[round] = false;
        await result.save();
      }
    }

    res.redirect("/adminpanel");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
