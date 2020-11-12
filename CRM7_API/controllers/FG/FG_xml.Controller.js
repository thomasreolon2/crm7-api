const express = require("express");
const router = express.Router();
const axios = require("axios");
const qs = require("qs");
const parseString = require("xml2js").parseString;

const { fg_url } = require("../../../URLs");
const FormData = require("form-data");
require("dotenv").config();

const xml_config = {
  headers: {
    "Content-Type": "text/xml",
  },
};

module.exports = {
  fg_xml: async (req, res) => {
    const { usuario, senha, cnpj } = req.body;

    //PÍCK TOKEN PROCESS....
    var xmlBodyStr =
      `<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Header>
    <UsuarioSoapHeader xmlns="http://ld2.ldsoft.com.br/">
      <Usuario>` +
      usuario +
      `</Usuario>
      <Senha>` +
      senha +
      `</Senha>
    </UsuarioSoapHeader>
  </soap12:Header>
  <soap12:Body>
    <ObterEnvolvidoPorCNPJCPF xmlns="http://ld2.ldsoft.com.br/">
      <cnpjcpf>` +
      cnpj +
      `</cnpjcpf>
    </ObterEnvolvidoPorCNPJCPF>
  </soap12:Body>
</soap12:Envelope>`;

console.log(JSON.stringify(xmlBodyStr))

    axios
      .post("url", xmlBodyStr, xml_config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
