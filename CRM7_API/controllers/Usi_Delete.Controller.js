const express = require("express");
const router = express.Router();
const axios = require("axios");
const { usi_delete_url } = require("../../URLs");

const FormData = require("form-data");
require("dotenv").config();

module.exports = {
  usi_delete: async (acess_token, req, res, next) => {
    const u = req.body;

    try {

      let mapZ = JSON.stringify(u).replace(/"/g, `'`);
      var formData = new FormData();

      formData.append("DeleteCrmAPIRequestUsibras", '"' + mapZ + '"');

      axios
        .create({
          headers: formData.getHeaders(),
        })
        .post(usi_delete_url, formData, {
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
