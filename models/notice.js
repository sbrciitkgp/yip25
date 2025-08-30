
const mongoose=require('mongoose');
const noticeSchema=mongoose.Schema({
   content:String,
   createdAt: {
    type: Date,
    default: Date.now, 
  },
   });

module.exports = mongoose.model("notice",noticeSchema);