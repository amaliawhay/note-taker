//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

//get db
const notesDB = require("./db/db.json");

//Variables to hold id's for notes
var idNum = null;
var getID = null;
//Set up express
const app = express();
const PORT = 8080;

//Allows express app to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//access to public dir
app.use(express.static("public"));

//sets ID's
if (notesDB.length === 0) {
  idNum = 0;
} else {
  getID = notesDB.length - 1;
  idNum - notesDB[getID].id;
}
//Gets index.html
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//Gets notes.html
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//api get
app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", function (err, data) {
    // Check for errors
    if (err) throw err;

    // Converting to JSON
    const newNote = JSON.parse(data);

    return res.json(newNote); // Prints note
  });
});

//api post
app.post("/api/notes", function (req, res) {
  //increments ID
  idNum++;
  //holds user input
  const postNote = req.body;
  //assign id
  postNote["id"] = idNum;
  notesDB.push(postNote);

  fs.writeFile(
    "./db/db.json",
    JSON.stringify(notesDB),
    (err) => {
      if (err) throw err;
      //console.log("Your note has been added");
      return res.json(postNote);
    }
  );
});

//api delete
app.delete("/api/notes/:id", function (req, res) {
  const selectNote = parseInt(req.params.id);
  console.log(selectNote);
  for (i = 0; i < notesDB.length; i++) {
    if (selectNote === notesDB[i].id) {
      console.log(notesDB[i]);
      result = notesDB.splice([i], 1);
      console.log(result);
      fs.writeFile(
        "./db/db.json",
        JSON.stringify(notesDB),
        (err) => {
          if (err) throw err;
          return res.json(notesDB);
        }
      );
    }
  }
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
