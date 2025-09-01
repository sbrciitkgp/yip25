const TeamModel = require("../models/team");
const pocModel = require("../models/poc");

exports.assignPocs = async (req, res) => {
  const teams = req.body.teams;
  for (const { teamName, pocName } of teams) {
    const team = await TeamModel.findOne({ TeamName: teamName });
    const poc = await pocModel.findOne({ name: pocName });

    if (!team || !poc) continue;

    team.poc = poc._id;
    await team.save();

    if (!poc.teams.includes(team._id)) {
      poc.teams.push(team._id);
      await poc.save();
    }
  }
  res.redirect("/adminpanel");
};
