const express = require("express");
const app = express();
const PORT = 5001;
const routes = require("./CRM7_API/routes/main");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.get("/",function(req,res){
    res.send('CRM7_API');
});

app.listen(process.env.PORT || 5001, function () {
  console.log("server running at port " + PORT);
  
});
