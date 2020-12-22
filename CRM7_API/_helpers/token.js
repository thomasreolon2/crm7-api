
module.exports = token;
const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();
const qs = require("qs");
var pickToken = false;
var acess_token = null;

async function token(req, res, next) {

    const pick_token_config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };


    if (pickToken == false) {

        pickToken = true;
        console.log('start');
        setTimeout(function () {
            pickToken = false;
            console.log("tokennnn:" + pickToken);
        }, 300000); //we can't generate more than 5 tokens during 5 minutes. 300000 = 

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

                acess_token = data["access_token"];

                console.log(acess_token);

                return next(acess_token)
            }).catch(function (error) {
                res.status(422).send(error.message);
            })


        // attach user to request object
       

    }else{ next(acess_token)}
    
}