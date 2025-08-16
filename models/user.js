
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
   Password:{
    type:String,
    required:true,
    },
   });

module.exports = mongoose.model("user",userSchema);