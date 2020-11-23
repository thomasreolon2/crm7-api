const express = require("express");
const router = express.Router();

const SellOrderController = require("../controllers/SellOrder.Controller");
const LeadRefreshController = require("../controllers/LeadRefresh.Controller");
const StatusController = require("../controllers/Status.Controller");
const LeadCreate = require("../controllers/LeadCreate.Controller");
const ClientController = require("../controllers/ClientRefresh.Controller");
const IDOmniaController = require("../controllers/InsertIDomnia.Controller");
const GetSellOrderController = require("../controllers/GetSellOrder.Controller");
const GetLeadController = require("../controllers/GetLead.Controller");
const Usi_LeadRefreshController = require("../controllers/Usi_LeadRefresh.Controller");
//VERSION 1.2:

router.post("/sell_order", SellOrderController.sell_order); //sell order

router.put("/lead_refresh", LeadRefreshController.lead_refresh); //refresh the data of lead

router.put("/usibras/lead_refresh", Usi_LeadRefreshController.usi_lead_refresh); //refresh the data of lead

router.post("/status", StatusController.status); //change the user status

router.post("/lead_create", LeadCreate.lead_create); //change the user status

router.put("/client_refresh", ClientController.client_refresh);

router.post("/insert_id", IDOmniaController.insert_id_omnia);

//router.post("/tabeladepreco", PriceTabel.status); //change the user status

router.get("/get_vendas", GetSellOrderController.get_vendas);

router.get("/get_leads", GetLeadController.get_leads);

module.exports = router;
