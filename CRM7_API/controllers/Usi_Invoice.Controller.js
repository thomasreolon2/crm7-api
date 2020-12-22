const express = require("express");
const router = express.Router();
const axios = require("axios");
const { usi_invoice_url } = require("../../URLs");

const FormData = require("form-data");
require("dotenv").config();

module.exports = {
  usi_invoice: async (acess_token, req, res, next) => {
    const u = req.body;

    try {

      let mapZ = JSON.stringify(u).replace(/"/g, `'`);
      var formData = new FormData();

      formData.append("FaturaCrmAPIRequestUsibras", '"' + mapZ + '"');

      axios
        .create({
          headers: formData.getHeaders(),
        })
        .post(usi_invoice_url, formData, {
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
            res.status(400).json({
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

    } catch (err) {
      res.status(422).send(err.message);
    }


  },
};
