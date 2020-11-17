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

var pickToken = false;
var acess_token = null;

module.exports = {
  insert_id_omnia: async (req, res) => {
    const { CNPJ,ID_Omnia } = req.body;

    if (pickToken == false) {
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
            pickToken = true;
            acess_token = data["access_token"];
            console.log(acess_token);


            setTimeout(function () {
              pickToken = false;
            }, 300000);

            //STATUS PROCES...

            var formData = new FormData();
            formData.append("CNPJ", CNPJ);

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
    } else {
      var formData = new FormData();
      formData.append("CNPJ", CNPJ);

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
          var data_serverless = response.data;
     
            res.status(200).json({
              CRM7: data_serverless,
            });
          
        })
        .catch(function (error) {
          console.log(error);
        });
      ////////
    }
  },
};
