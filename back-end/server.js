const express = require('express')
const bodyParser = require('body-parser');

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')

const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  name: String,
  content: String,
  date: String,
})


const Journal = mongoose.mode('Journal', journalSchema);


//No idea but creates journal entry
app.post('/api/journals', async (req, res) => {
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
})


app.get('/api/journals', async (req, res) => {
  try {
    let journals = await Journal.find();
    res.send(journals);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.delete('/api/journals/:id', async (req, res) => {
  try {
    await Journal.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})


app.put('api/journals/:id', async (req, res) => {
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
})

app.listen(3000, () => console.log('Kade is trash, and server is listening on port 3000!'));