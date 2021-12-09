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

mongoose.connect('mongodb://localhost:27017/cloudstorage', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const journalEntrySchema = new mongoose.Schema({
  name: String,
  content: String,
  date: String,
});

const JournalEntryEntry = mongoose.model('JournalEntryEntry', journalEntrySchema);

//No idea but creates journal entry
app.post('/api/entries', async (req, res) => {
  try {
    let entry = new JournalEntryEntry({
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
    entry.content = req.body.description
    entry.data = req.body.date
    entry.save()
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

