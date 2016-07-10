var express = require("express");
var pugStatic = require('connect-pug-static');
var path = require("path");

var app = express();

app.use("/", express.static(__dirname + "/app/assets/views"));
app.use("/assets", express.static(__dirname + "/app/assets"));

app.listen(3000, function () {
  console.log("Listening on port 3000...");
});
