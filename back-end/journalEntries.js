const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const journalEntrySchema = new mongoose.Schema({
  name: String,
  content: String,
  date: String,
});

const JournalEntryEntry = mongoose.model('JournalEntryEntry', journalEntrySchema);

//No idea but creates journal entry
router.post('/api/entries', async (req, res) => {
  try {
    let entry = new JournalEntryEntry({
    name: req.body.name,
    content: req.body.content,
    date: req.body.date,
    });
    await entry.save();
    res.send(entry);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//get all journalentries
router.get('/api/entries', async (req, res) => {
  try {
    let entries = await JournalEntry.find();
    res.send(entries);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/api/entries/:id', async (req, res) => {
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
router.put('/api/entries/:id', async (req, res) => {
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


module.exports = {
  model: JournalEntryEntry,
  routes: router,
}