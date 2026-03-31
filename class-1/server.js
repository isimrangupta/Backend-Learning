const express = require("express");
const app = express();

// POST /notes => {title, content}

app.use(express.json());

let notes = [];

app.get("/", (req, res) => {
  res.send("Hello, world");
});

app.post("/notes", (req, res) => {
  console.log(req.body);
  notes.push(req.body);
  res.json({
    message: "note created successfully",
  });
});

app.get("/notes", (req, res) => {
  res.json(notes);
});

// DELETE /notes/:index

app.delete("/notes/:index", (req, res) => {
  const idx = req.params.index;

  delete notes[idx];
  res.json({
    message: "note deleted successfully",
  });
});

// PATCH  /notes/:index => {title}

app.patch("/notes/:index", (req, res) => {
  const idx = req.params.index;
  const { title } = req.body;

  notes[idx].title = title;

  res.json({
    message: "note updated successfully !",
  });
});



app.listen(3000, () => {
  console.log("server is running on port 3000");
});
