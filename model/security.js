const mongoose = require("mongoose");

const securitySchema = new mongoose.Schema(
  {
   ticker:{
       type:String,
       required:true,
       unique:true
   },
   price:{
       type:Number,
       required:true
   }
  },
  { timestamps: true }
);

const security = mongoose.model("security", securitySchema);
module.exports = security;
