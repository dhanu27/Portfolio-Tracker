const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    ticker: {
      type:String,
    },
   avg_buy_price:{
       type:Number
   },
   share:{
      type:Number,
      min:0
   }
  },
  { timestamps: true }
);

const portfolio = mongoose.model("portfolio", portfolioSchema);
module.exports = portfolio;
