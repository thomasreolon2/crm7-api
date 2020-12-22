const express = require("express");
const router = express.Router();
const axios = require("axios");

const { get_vendas } = require("../../URLs");

const FormData = require("form-data");
require("dotenv").config();

module.exports = {
  get_vendas: async (acess_token, req, res, next) => {
    const u = req.body;

    try {

          var formData = new FormData();

          let mapZ = JSON.stringify(u).replace(/"/g, `'`);
          var formData = new FormData();

          formData.append("getVendasCrmAPIRequest", '"' + mapZ + '"');

          console.log('"' + mapZ + '"');

          axios
            .create({
              headers: formData.getHeaders(),
            })
            .post(get_vendas, formData, {
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
        
    } catch (err) {
      res.status(422).send(err.message);
    }
  },
};
