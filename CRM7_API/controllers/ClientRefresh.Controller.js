const express = require("express");
const router = express.Router();
const axios = require("axios");
const { client_refresh_server_less_url } = require("../../URLs");

const FormData = require("form-data");
require("dotenv").config();

module.exports = {

  client_refresh: async (acess_token, req, res, next) => {
    
    const u = req.body;

    try {

          jsonLineB = JSON.stringify(u);

          console.log('"' + jsonLineB + '"');

          var formData = new FormData();
          formData.append("testeregistro", '"'+jsonLineB+'"');

          axios
            .create({
              headers: formData.getHeaders(),
            })
            .post(
              client_refresh_server_less_url,
              formData,
              {
                headers: {
                  auth_type: "oauth",
                  Authorization: "Zoho-oauthtoken " + acess_token,
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then(function (response) {
              data_serverless = response.data;

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
