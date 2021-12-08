const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

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

//import journals:
const journalEntries = require("./journalEntries.js");
app.use("/api/entries", journalEntries.routes);

//import photos:
const photos = require("./photos.js");
app.use("/api/photos", photos.routes);

//listen on 3002 to avoid interfering with other projects
app.listen(3002, () => console.log('Kade is trash, and server is listening on port 3002!'));