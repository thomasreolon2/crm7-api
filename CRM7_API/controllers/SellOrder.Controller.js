const express = require("express");
const router = express.Router();
const axios = require("axios");
const qs = require("qs");

const { pick_token_url } = require("../../URLs");
const { sell_order_server_less_url } = require("../../URLs");

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
  sell_order: async (req, res) => {
    const u = req.body;

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

            var formData = new FormData();

            let mapZ = JSON.stringify(u).replaceAll('"', `'`);

            formData.append("VendasCrmAPIRequest", '"' + mapZ + '"');

            console.log('"' + mapZ + '"');
            //SELL ORDER PROCES....

            axios
              .create({
                headers: formData.getHeaders(),
              })
              .post(sell_order_server_less_url, formData, {
                headers: {
                  auth_type: "oauth",
                  Authorization: "Zoho-oauthtoken " + acess_token,
                  "Content-Type": "multipart/form-data",
                },
              })
              .then(function (response) {
                if (response) {
                  var data_serverless = response.data;
                  var codeMsgVerify = data_serverless.details["output"];
                  var error = "erro";
                  console.log(codeMsgVerify);
                  if (codeMsgVerify.includes("Erro")) {
                    const td = JSON.stringify(data_serverless).replace(
                      "success",
                      "error"
                    );

                    var tempData = JSON.parse(td);
                    res.status(400).json({
                      CRM7: tempData,
                    });
                  } else {
                    res.status(200).json({
                      CRM7: data_serverless,
                    });
                  }
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
    } else {
      var formData = new FormData();

      let mapZ = JSON.stringify(u).replaceAll('"', `'`);

      formData.append("VendasCrmAPIRequest", '"' + mapZ + '"');

      console.log('"' + mapZ + '"');

      axios
        .create({
          headers: formData.getHeaders(),
        })
        .post(sell_order_server_less_url, formData, {
          headers: {
            auth_type: "oauth",
            Authorization: "Zoho-oauthtoken " + acess_token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          if (response) {
            var data_serverless = response.data;
            var codeMsgVerify = data_serverless.details["output"];
            var error = "erro";
            console.log(codeMsgVerify);
            if (codeMsgVerify.includes("Erro")) {
              const td = JSON.stringify(data_serverless).replace(
                "success",
                "error"
              );

              var tempData = JSON.parse(td);
              res.status(400).json({
                CRM7: tempData,
              });
            } else {
              res.status(200).json({
                CRM7: data_serverless,
              });
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      ////////
    }
  },
};
