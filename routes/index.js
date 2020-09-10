const express=require('express');
const routes=express.Router();

const tradeController=require('../controllers/trade_controller');

routes.get("/", tradeController.getHoldings);
routes.get("/return", tradeController.getReturn);
routes.get("/portfolio", tradeController.getPortfolio);

routes.use("/trade", require("./trade"));

module.exports=routes;