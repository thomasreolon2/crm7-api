const express = require("express");
const router = express.Router();

const SellOrderController = require("../controllers/SellOrder.Controller");
const LeadRefreshController = require("../controllers/LeadRefresh.Controller");
const StatusController = require("../controllers/Status.Controller");
const LeadCreate = require("../controllers/LeadCreate.Controller");
const ClientController = require("../controllers/ClientRefresh.Controller");
const IDOmniaController = require("../controllers/InsertIDomnia.Controller");

//VERSION 1.2:

router.post("/sell_order", SellOrderController.sell_order); //sell order

router.put("/lead_refresh", LeadRefreshController.lead_refresh); //refresh the data of lead

router.post("/status", StatusController.status); //change the user status

router.post("/lead_create", LeadCreate.lead_create); //change the user status

router.put("/client_refresh", ClientController.client_refresh);

router.post("/insertID", IDOmniaController.insert_id_omnia);
//router.post("/tabeladepreco", PriceTabel.status); //change the user status

module.exports = router;
