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
//Takes /public dir out of URL
app.use(express.static("public"));

//Gets index.html
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//Gets notes.html
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//api
app.get("api/notes", function (req, res) {
  fs.readFile("db.json", function (err, data) {
    // Check for errors
    if (err) throw err;

    // Converting to JSON
    const newNote = JSON.parse(data);

    console.log(newNote); // Prints note
  });
});
//server is listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
