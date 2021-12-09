const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
//const router = express.Router();

// setup express
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const multer = require('multer');
const { application } = require('express');
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 50000000
  }
});

mongoose.connect('mongodb://localhost:27017/cloudstorage', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

//// JOURNAL ENTRY SECTION ////
const journalEntrySchema = new mongoose.Schema({
  name: String,
  content: String,
  date: String,
});

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);

const photoSchema = new mongoose.Schema({
  path: String,
  title: String,
  description: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Photo = mongoose.model('Photo', photoSchema);


//No idea but creates journal entry
app.post('/api/entries', async (req, res) => {
  try {
    let entry = new JournalEntry({
    name: req.body.name,
    content: req.body.content,
    date: req.body.date,
    });
    await entry.save();
    res.send(entry);
    console.log("HHHAHAH");

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//get all journalentries
app.get('/api/entries', async (req, res) => {
  try {
    let entries = await JournalEntry.find();
    res.send(entries);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/entries/:id', async (req, res) => {
  try {
    await JournalEntry.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//edit an entry
app.put('/api/entries/:id', async (req, res) => {
  try {
    let entry = await JournalEntry.findOne({
      _id: req.params.id,
    });
    entry.name = req.body.name
    entry.content = req.body.content
    entry.date = req.body.date
    entry.save()
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//// PHOTO SECTION ////

app.post("/api/photos", upload.single('photo'), async (req, res) => {
  // check parameters
  if (!req.file)
    return res.status(400).send({
      message: "Must upload a file."
    });
  console.log(req.body.description, " was received from web");
  const photo = new Photo({
    path: "/images/" + req.file.filename,
    title: req.body.title,
    description: req.body.description,
  });
  console.log(photo.description);
  try {
    await photo.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all photos
app.get("/api/photos", async (req, res) => {
  try {
    let photos = await Photo.find().sort({
      created: -1
    });
    console.log(photos);
    return res.send(photos);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

app.delete('/api/photos/:id', async (req, res) => {
  console.log("made it to delete");
  try {
    await Photo.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

/*

//import journals:
const journalEntries = require("./journalEntries.js");
app.use("/api/entries", journalEntries.routes);

//import photos:
const photos = require("./photos.js");
app.use("/api/photos", photos.routes);

*/

//listen on 3002 to avoid interfering with other projects
app.listen(3002, () => console.log('Kade is trash, and server is listening on port 3002!'));

