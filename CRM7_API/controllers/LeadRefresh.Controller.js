const express = require("express");
const router = express.Router();
const axios = require("axios");
const qs = require("qs");

const { pick_token_url } = require("../../URLs");
const { lead_refresh_server_less_url } = require("../../URLs");

const FormData = require("form-data");
require("dotenv").config();

const pick_token_config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

module.exports = {
  lead_refresh: async (req, res) => {
    const u = req.body;

    try {
      //PÍCK TOKEN PROCESS....

      axios
        .post(
          "https://accounts.zoho.com/oauth/v2/token",
          qs.stringify({
            refresh_token: process.env.REFRESH_TOKEN,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: "refresh_token",
          }),
          pick_token_config
        )
        .then(function (response) {
          var data = response.data;
          var acess_token = data["access_token"];

          //SERVER_LESS PROCESS TOKEN RECEIVED

          let mapZ = JSON.stringify(u).replaceAll('"', `'`);
          var formData = new FormData();

          formData.append("LeadCrmAPIRequest", '"' + mapZ + '"');

          //LEAD REFRESH PROCESS...
          axios
            .create({
              headers: formData.getHeaders(),
            })
            .post(lead_refresh_server_less_url, formData, {
              headers: {
                auth_type: "oauth",
                Authorization: "Zoho-oauthtoken " + acess_token,
                "Content-Type": "multipart/form-data",
              },
            })
            .then(function (response) {
              var data_serverless = response.data;
              var codeMsgVerify = data_serverless.details["output"];
              var error = "erro";
           
              if (codeMsgVerify.includes("Erro")) {
                const td = JSON.stringify(data_serverless).replace(
                  "success",
                  "error"
                );

                var tempData = JSON.parse(td);
                res.status(200).json({
                  CRM7: tempData,
                });
              } else {
                res.status(200).json({
                  CRM7: data_serverless,
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
          ////////
        })
        .catch(function (error) {
          res.status(422).send(error.message);
        });
    } catch (err) {
      res.status(422).send(err.message);
    }
  },
};
