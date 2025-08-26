const mongoose=require('mongoose');
mongoose.connect(`mongodb://127.0.0.1:27017/yip`)

const memberSchema = new mongoose.Schema({
  participantName: {
    type: String,
    required: true,
    trim: true,
  },
  participantEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  participantPhone: {
    type: String,
    required: true,
    trim: true,
  },
  grade: {
    type: String, 
    required: true,
  },
});


const teamSchema = new mongoose.Schema(
  {
    TeamName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    MentorName: {
      type: String,
      required: true,
      trim: true,
    },
    MentorEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    MentorPhone: {
      type: String,
      required: true,
      trim: true,
    },
    SchoolName: {
      type: String,
      required: true,
      trim: true,
    },
    SchoolPhone: {
      type: String,
      required: true,
      trim: true,
    },
    SchoolEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    Members: {
      type: [memberSchema],
      default: [],
    },
    poc: { type: mongoose.Schema.Types.ObjectId, ref: "poc" }
  },
);

const Team = mongoose.model("team", teamSchema);

module.exports = Team;