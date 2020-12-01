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
const Usi_AgentController = require("../controllers/Usi_Agent.Controller");
const Usi_Account_Contacts = require("../controllers/Usi_Account_Contacts.Controller");
const Usi_ProductsController = require("../controllers/Usi_Products.Controller");
const Usi_OrdersController = require("../controllers/Usi_Orders.Controller");
const Usi_ProposalController = require("../controllers/Usi_Proposal.Controller");
const Usi_AgreementController = require("../controllers/Usi_Agreement.Controller");
const Usi_InvoiceController = require("../controllers/Usi_Invoice.Controller");

//VERSION 1.2:

router.post("/sell_order", SellOrderController.sell_order); //sell order

router.put("/lead_refresh", LeadRefreshController.lead_refresh); //refresh the data of lead

router.put("/usibras/customers", Usi_LeadRefreshController.usi_lead_refresh); //refresh the data of lead

router.post("/usibras/agent", Usi_AgentController.usi_agent);

router.post ("/usibras/accounts_contact", Usi_Account_Contacts.usi_account_contacts);

router.post ("/usibras/products", Usi_ProductsController.usi_products);

router.post ("/usibras/orders", Usi_OrdersController.usi_orders);

router.post ("/usibras/proposal", Usi_ProposalController.usi_proposal);

router.post ("/usibras/agreement", Usi_AgreementController.usi_agreement);

router.post ("/usibras/invoice", Usi_InvoiceController.usi_invoice);

router.post("/status", StatusController.status); //change the user status

router.post("/lead_create", LeadCreate.lead_create); //change the user status

router.put("/client_refresh", ClientController.client_refresh);

router.post("/insert_id", IDOmniaController.insert_id_omnia);

//router.post("/tabeladepreco", PriceTabel.status); //change the user status

router.get("/get_vendas", GetSellOrderController.get_vendas);

router.get("/get_leads", GetLeadController.get_leads);

module.exports = router;
