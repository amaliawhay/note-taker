//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

//get db
const notesDB = require("./db/db.json");

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
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//Gets notes.html
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//api get
app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

/*
app.get("/api/notes", function (req, res) {
  fs.readFile("db.json", function (err, data) {
    // Check for errors
    if (err) throw err;

    // Converting to JSON
    const newNote = JSON.parse(data);

    return res.json(newNote); // Prints note
  });
});
*/

//api post
app.post("/api/notes", function (req, res) {
  const postNote = req.body;

  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    console.log(data);
    let file = JSON.parse(data);
    file.push(postNote);

    fs.writeFile(
      "./db/db.json",
      JSON.stringify(file),
      (err) => {
        if (err) throw err;
        console.log("Your note has been added");
      }
    );
  });

  res.redirect("/notes");
});

//api delete
app.delete("/api/notes/:id", function (req, res) {
  const db = fs.readFileSync(
    path.join(__dirname, "./db/db.json")
  );

  const dbFile = JSON.parse(db);

  let id = req.params.id;

  for (let i = 0; i < dbFile.length; i++) {
    if (dbFile[i].id.toString() === id) {
      id.splice(i, 1);
      console.log(dbFile);
      break;
    }
  }

  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(dbFile)
  );

  res.sendStatus(200);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
/* DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
This means you'll need to find a way to give each note a unique `id` when it's saved.
In order to delete a note, you'll need to read all notes from the `db.json` file, 
remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.*/
//assign id to each posted note
/*filter? through array of objects in db.json
 */

//remove selected note
//post all remaining notes to db.json
//server is listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
