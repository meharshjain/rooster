import express from "express";
import methodOverride from "method-override";
import bodyParser from "body-parser";
import askBing from "./askBing/askBing.js";
var app = express();
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 5000;
askBing("hello")
app.listen(port, function () {
  console.log("Server Is Now Started!");
});
