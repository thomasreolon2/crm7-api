const express = require("express");
const router = express.Router();
const axios = require("axios");
const qs = require("qs");

const { pick_token_url } = require("../../URLs");
const { lead_refresh_server_less_url } = require("../../URLs");

const FormData = require("form-data");
require("dotenv").config();

const pick_token_config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

module.exports = {
  lead_refresh: async (req, res) => {
    const {
      cnpj,
      telefone,
      situacao,
      tipo,
      cidade,
      estado,
      motivoSituacao,
      dataPublicacao,
      atividadePrincipal,
      cep,
      codigoSimp,
      atividadesSecundarias,
      email2,
      nomeFantasia,
      complemento,
      naturezaJuridica,
      situacaoEspecial,
      bandeira,
      email,
      dataSituacaoEspecial,
      dataVinculacao,
      atividadePrincipalCNAE,
      socios,
      pais,
      dataSituacao,
      abertura,
      numeroAutorizacao,
      razaoSocial,
      capitalSocial,
      rua,
      area,
      rota,
    } = req.body;

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
          var acess_token = data["access_token"];
          console.log(acess_token);
          //SERVER_LESS PROCESS TOKEN RECEIVED

          let sociosMap = JSON.stringify(socios).replaceAll('"', `'`);
          let atividadesSecundariasMap = JSON.stringify(
            atividadesSecundarias
          ).replaceAll('"', `'`);
          var formData = new FormData();

          formData.append("cnpj", cnpj);
          formData.append("telefone", telefone);
          formData.append("situacao", situacao);
          formData.append("tipo", tipo);
          formData.append("cidade", cidade);
          formData.append("dataPublicacao", dataPublicacao);
          formData.append("estado", estado);
          formData.append("motivoSituacao", motivoSituacao);
          formData.append("atividadePrincipal", atividadePrincipal);
          formData.append("cep", cep);
          formData.append("codigoSimp", codigoSimp);

          formData.append(
            "atividadesSecundarias",
            '"' + atividadesSecundariasMap + '"'
          );

          formData.append("email2", email2);
          formData.append("nomeFantasia", nomeFantasia);
          formData.append("complemento", complemento);

          formData.append("naturezaJuridica", naturezaJuridica);
          formData.append("situacaoEspecial", situacaoEspecial);
          formData.append("bandeira", bandeira);
          formData.append("email", email);
          formData.append("dataSituacaoEspecial", dataSituacaoEspecial);
          formData.append("dataVinculacao", dataVinculacao);
          formData.append("atividadePrincipalCNAE", atividadePrincipalCNAE);

          formData.append("socios", '"' + sociosMap + '"');

          formData.append("pais", pais);
          formData.append("dataSituacao", dataSituacao);
          formData.append("abertura", abertura);
          formData.append("numeroAutorizacao", numeroAutorizacao);
          formData.append("razaoSocial", razaoSocial);
          formData.append("capitalSocial", capitalSocial);
          formData.append("rua", rua);
          formData.append("area", area);
          formData.append("rota", rota);

          console.log(formData);

          //LEAD REFRESH PROCESS...
          axios
            .create({
              headers: formData.getHeaders(),
            })
            .post(lead_refresh_server_less_url, formData, {
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
                  'success',
                  'error'
                );

                var tempData = JSON.parse(td)
                res.status(200).json({
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
        })
        .catch(function (error) {
          res.status(422).send(error.message);
        });
    } catch (err) {
      res.status(422).send(err.message);
    }
  },
};
