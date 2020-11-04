const express = require("express");
const router = express.Router();
const axios = require("axios");
const qs = require("qs");

const { pick_token_url } = require("../../URLs");
const { insert_id_omnia_server_less_url } = require("../../URLs");

const FormData = require("form-data");
require("dotenv").config();

const pick_token_config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

module.exports = {
  insert_id_omnia: async (req, res) => {
    const { CNPJ, ID_Omnia } = req.body;

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

          //SERVER_LESS PROCESS TOKEN RECEIVED

          var formData = new FormData();
          //formData.append("Numero", Numero);
          // formData.append("Cliente_ID", Cliente_ID);

          //jsonLineB = JSON.stringify(u);
          //let jsonLineA = jsonLineB.replaceAll('"', "'");

          //console.log('"' + jsonLineA + '"');

          var formData = new FormData();
          formData.append("ID_Omnia", ID_Omnia);
          formData.append("CNPJ", CNPJ);

          console.log(formData);

          //SELL ORDER PROCES....

           axios
            .create({
              headers: formData.getHeaders(),
            })
            .post(insert_id_omnia_server_less_url, formData, {
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
