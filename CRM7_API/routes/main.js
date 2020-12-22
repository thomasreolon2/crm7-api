const express = require("express");
const router = express.Router();
const basicAuth = require("../_helpers/basic-auth");
const token = require("../_helpers/token");
//const errorHandler = require("../_helpers/error-handler");


const SellOrderController = require("../controllers/SellOrder.Controller");
const LeadRefreshController = require("../controllers/LeadRefresh.Controller");
const StatusController = require("../controllers/Status.Controller");
const LeadCreateController = require("../controllers/LeadCreate.Controller");
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
const Usi_AgreementController = require("../controllers/Usi_Agree.Controller");
const Usi_InvoiceController = require("../controllers/Usi_Invoice.Controller");
const Usi_DeleteController = require("../controllers/Usi_Delete.Controller");

//VERSION 1.2:

router.post("/sell_order", token, SellOrderController.sell_order); //sell order

router.put("/lead_refresh", token, LeadRefreshController.lead_refresh); //refresh the data of lead

router.put("/usibras/customers", basicAuth, token, Usi_LeadRefreshController.usi_lead_refresh); //refresh the data of lead

router.post("/usibras/agent", basicAuth, token, Usi_AgentController.usi_agent);

router.delete("/usibras/delete", basicAuth, token, Usi_DeleteController.usi_delete);

router.put("/usibras/accounts_contact", basicAuth, token, Usi_Account_Contacts.usi_account_contacts);

router.put("/usibras/products", basicAuth, token, Usi_ProductsController.usi_products);

router.post("/usibras/orders", basicAuth, token, Usi_OrdersController.usi_orders);

router.post("/usibras/proposal", basicAuth, token, Usi_ProposalController.usi_proposal);

router.post("/usibras/agreement", basicAuth, token, Usi_AgreementController.usi_agree);

router.post("/usibras/invoice", basicAuth, token, Usi_InvoiceController.usi_invoice);

router.post("/status", token, StatusController.status); //change the user status

router.post("/lead_create", token, LeadCreateController.lead_create); //change the user status

router.put("/client_refresh", token, ClientController.client_refresh);

router.post("/insert_id", token, IDOmniaController.insert_id_omnia);

//router.post("/tabeladepreco", PriceTabel.status); //change the user status

router.get("/get_vendas", token, GetSellOrderController.get_vendas);

router.get("/get_leads", token, GetLeadController.get_leads);


module.exports = router;
