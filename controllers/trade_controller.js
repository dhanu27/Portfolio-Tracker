const Portfolio=require('../model/portfolio');
const security=require('../model/security');

// Add a Trades
module.exports.addTrades=async function(req,res){
   try{
         const { ticker, share, price } = req.body;
          
         let trade = await Portfolio.create({
           ticker: ticker,
           share: share,
           avg_buy_price: price,
         });
      if(req.xhr){   
        return res.json(200,{
            trade:trade,
            message:"Successfully add a trade"
        }) 
      }
      return res.redirect("/"); 
   }catch(err){
       console.log("Error in Adding trade",err);  
        return res.status(504).json({
          message: "Error in adding a trade",
        });
   }        
}

// Update a Trade 
module.exports.updateTradeById=async function(req,res){
    try{
       let tickerId=req.params.id;
       let {action,share,price}=req.body;
        price=parseFloat(price);
        share=parseInt(share);  
     // If shares are sold out then subtract it from available
       if(action=="sell"){
         share=-share
       }

       let trade=await Portfolio.findById(tickerId);
      
      //  If share became less than zero then return 
       if(trade.share+share<0){
             return res.json(405, {
               message: "You can't sell more than you have",
             }); 
       }

    // Selling not affect avg price
     if(share>0){ 
      trade.avg_buy_price =(( trade.avg_buy_price * trade.share)+( price * share))/(trade.share + share); 
    }
      trade.share =trade.share + share;

     await trade.save();
     if(req.xhr){  
      res.status(200).json({
         trade:trade
       })
     }
   return res.redirect("/"); 
  }catch(err){
        console.log("Error in Updating Trade",err);
        res.status(540).json({
            msg:"Error in updating trade"
        });
    }
}

// Delete a Trade
module.exports.removeTrade=async function(req,res){
  try{ 
    let tradeId = req.params.id;
    let trade = await Portfolio.findByIdAndDelete(tradeId);
     if(req.xhr){  
        res.status(200).json({
          message:"Successfully delete a item",
          trade:trade
      }); 
    }
  return res.redirect("/");
  }catch(err){

    res.status(540).json({
      msg: "Error in updating trade",
    });
  }
}

// Fetch Portfolio
module.exports.getPortfolio=async function(req,res){
  try{
     let portfolio=await Portfolio.find({}).select('ticker share');
     res.status(200).json({
        portfolio:portfolio
     }) 
  }catch(err){ 
     res.status(540).json({
     msg: "Error in fetching  portfolio",
  });
  }
}

// Fetch the All Holdings
module.exports.getHoldings=async function(req,res){
  try {
    let holdings = await Portfolio.find({});
  if(req.xhr){  
    res.status(200).json({
      data: holdings,
      });
    } 
    // To show total Return call get Return from here also.
    let totalReturns=await getReturn();
      
    return res.render("home",{
      portfolio:holdings,
      returns:totalReturns[0].totalAmount
    })
  } catch (err) {
    console.log("Error in holdings",err);
    res.status(540).json({
      msg: "Error in getting Holdings",
    });
  }
}

// To get totalReturns Calculation Logic
let getReturn = async function () {
  let totalReturn = await Portfolio.aggregate([
    {
      $group: {
        _id: "",
        totalAmount: {
          $sum: {
            $multiply: ["$share", { $subtract: [100, "$avg_buy_price"] }],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalAmount: 1,
      },
    },
  ]);
  console.log("Total return ",totalReturn);
  return totalReturn;
};

// For Fetching Total Return to response API 
module.exports.getReturn=async function(req,res){
   try {
    let totalReturn= getReturn();
    res.status(200).json({
      data:totalReturn
    })
   } catch (err) {
     console.log("Error in Get Holdings", err);
     res.status(540).json({
       msg: "Error in   ",
     });
   }
}

