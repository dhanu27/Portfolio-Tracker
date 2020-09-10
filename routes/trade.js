const express = require("express");
const routes = express.Router();

const tradeController = require("../controllers/trade_controller");

routes.post("/add", tradeController.addTrades);
routes.post("/update/:id", tradeController.updateTradeById);
routes.get("/remove/:id", tradeController.removeTrade);

module.exports=routes;

