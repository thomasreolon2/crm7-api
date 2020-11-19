const express = require("express");
const router = express.Router();
const axios = require("axios");
const qs = require("qs");

const { pick_token_url } = require("../../URLs");
const { get_leads } = require("../../URLs");

const FormData = require("form-data");
require("dotenv").config();

const pick_token_config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

module.exports = {
  get_leads: async (req, res) => {
    const u = req.body;

    try {
      
      //PÍCK TOKEN PROCESS....

      axios
        .post(
          pick_token_url,
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
      
          var formData = new FormData();
      
          let mapZ = JSON.stringify(u).replaceAll('"', `'`);
          var formData = new FormData();

          formData.append("VendasCrmAPIRequest", '"' + mapZ + '"');

          console.log('"' + mapZ + '"');
          //SELL ORDER PROCES....

          axios
            .create({
              headers: formData.getHeaders(),
            })
            .post(get_leads, formData, {
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
                console.log(codeMsgVerify);
             
                  res.status(200).json({
                    CRM7: data_serverless,
                  });
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
