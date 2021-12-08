const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const journalSchema = new mongoose.Schema({
  name: String,
  content: String,
  date: String,
});

const Journal = mongoose.model('Journal', journalSchema);

//No idea but creates journal entry
router.post('/api/journals', async (req, res) => {
  const journal = new Journal({
    name: req.body.name,
    content: req.body.content,
    date: req.body.date,
  });
  try {
    await journal.save();
    res.send(journal);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


router.get('/api/journals', async (req, res) => {
  try {
    let journals = await Journal.find();
    res.send(journals);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/api/journals/:id', async (req, res) => {
  try {
    await Journal.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put('api/journals/:id', async (req, res) => {
  try {
    let journal = await Journal.findOne({
      _id: req.params.id,
    });
    journal.name = req.body.name
    journal.content = req.body.description
    journal.data = req.body.date
    journal.save()
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  model: Journal,
  routes: router,
}