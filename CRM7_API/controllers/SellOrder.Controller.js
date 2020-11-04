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

module.exports = {
  sell_order: async (req, res) => {
    const {
      Numero,
      Cliente_ID,
      Codigo_do_Cliente,
      Valor,
      Cliente_loja,
      Quantidade,
      CNPJ,
      Condicao_de_pagamento,
      Produto_descricao,
      Emissao,
      Filial,
      Valor_unitario,
      Produto_ID,
      nome_venda,
      moeda,
    } = req.body;

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
      
          var formData = new FormData();
          formData.append("Numero", Numero);
          formData.append("Cliente_ID", Cliente_ID);
          formData.append("Codigo_do_Cliente", Codigo_do_Cliente);
          formData.append("Valor", Valor);
          formData.append("Cliente_loja", Cliente_loja);
          formData.append("Quantidade", Quantidade);
          formData.append("CNPJ", CNPJ);
          formData.append("Condicao_de_pagamento", Condicao_de_pagamento);
          formData.append("Produto_descricao", Produto_descricao);
          formData.append("Emissao", Emissao);
          formData.append("Filial", Filial);
          formData.append("Valor_unitario", Valor_unitario);
          formData.append("Produto_ID", Produto_ID);
          formData.append("nome_venda", nome_venda);
          formData.append("moeda", moeda);

          console.log(formData);

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
