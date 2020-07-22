//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

//Set up express
const app = express();
const PORT = 8080;

//Allows express app to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//gives express access to HTML and CSS in public dir
app.use(express.static("public"));

//server is listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
