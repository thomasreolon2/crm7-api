const express = require("express");
const app = express();
const PORT = 5001;
const routes = require("./CRM7_API/routes/main");
const cors = require("cors");
const basicAuth = require("./CRM7_API/_helpers/basic-auth");
const errorHandler = require("./CRM7_API/_helpers/error-handler");



//app.use(basicAuth);
// api routes
///app.use("/users", require("./CRM7_API/_helpers/users.Controller"));

// global error handler
//app.use(errorHandler);
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.get("/", function (req, res) {
  res.send("CRM7_API");
});



app.listen(process.env.PORT || 5001, function () {
  console.log("server running at port " + PORT);
});
