const mongoose=require('mongoose');
mongoose.connect(`mongodb://127.0.0.1:27017/yip`)
const userSchema=mongoose.Schema({
   TeamName:{
    type:String,
    required:true,
    },
   MentorName:{
    type:String,
    required:true,
    },
   MentorEmail: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },
   MentorPhone:{
    type:Number,
    required:true,
    },
   SchoolName:{
    type:String,
    required:true,
    },
   SchoolEmail: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address']
  },
   SchoolPhone:{
    type:Number,
    required:true,
    },
   Password:{
    type:String,
    required:true,
    },
    Admin:{
      type:Boolean,
      default:false,
    },
    poc: [{ type: mongoose.Schema.Types.ObjectId, ref: "poc" }]
   });

module.exports = mongoose.model("user",userSchema);