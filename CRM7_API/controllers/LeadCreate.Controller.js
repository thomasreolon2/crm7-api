const express = require("express");
const router = express.Router();
const axios = require("axios");
const { lead_create_server_less_url } = require("../../URLs");

const FormData = require("form-data");
require("dotenv").config();

module.exports = {
  
    lead_create: async (acess_token, req, res, next) => {

    const u = req.body;

    try {
          var formData = new FormData();
         //formData.append("Numero", Numero);
         // formData.append("Cliente_ID", Cliente_ID);
        
         jsonLineB = JSON.stringify(u);
         let jsonLineA = jsonLineB.replace(/"/g, `'`);

         console.log('"' + jsonLineA + '"');

         var formData = new FormData();
         formData.append("request_body", '"'+jsonLineA+'"');

          //SELL ORDER PROCES....

          axios
            .create({
              headers: formData.getHeaders(),
              
            })
            .post(lead_create_server_less_url, formData, {
              headers: {
                auth_type: "oauth",
                Authorization: "Zoho-oauthtoken " + acess_token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then(function (response) {
              if (response) {
                data_serverless = response.data;
                console.log(data_serverless);
                res.status(200).json({
                  CRM7: data_serverless["message"],
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
          ////////
       
    } catch (err) {
      res.status(422).send(err.message);
    }
  },
};
