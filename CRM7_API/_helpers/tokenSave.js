module.exports = { acess_token: null };
module.exports = { pickToken: false };

module.exports = {
  timerGenerator: function () {
    pickToken = true;

    setTimeout(function () {
      pickToken = false;
      console.log("tokennnn:"+pickToken);
    }, 300000);

    console.log("acess_token:"+acess_token);
    console.log("tokennnn:"+pickToken);
  },
};
