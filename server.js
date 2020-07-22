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
//gives express access to files in public dir
app.use(express.static("public"));

//returns index file
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//returns notes file
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
//server is listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
