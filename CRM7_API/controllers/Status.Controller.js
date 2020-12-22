const express = require("express");
const router = express.Router();
const axios = require("axios");
const { status_server_less_url } = require("../../URLs");

const FormData = require("form-data");
require("dotenv").config();


module.exports = {
  status: async (acess_token, req, res, next) => {
    const { CNPJ } = req.body;

      try {

            var formData = new FormData();
            formData.append("CNPJ", CNPJ);

            axios
              .create({
                headers: formData.getHeaders(),
              })
              .post(status_server_less_url, formData, {
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
