const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer');
const { application } = require('express');
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 50000000
  }
});

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

// upload photo
router.post("/", upload.single('photo'), async (req, res) => {
  // check parameters
  if (!req.file) {
    return res.status(400).send({
      message: "Must upload a file."
    });
  }
  const photo = new Photo({
    path: "/images/" + req.file.filename,
    title: req.body.title,
    description: req.body.description
  });
  try {
    await photo.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all photos
router.get("/", async (req, res) => {
  try {
    let photos = await Photo.find().sort({
      created: -1
    })
    return res.send(photos);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let photo = await Photo.findById({
      _id: req.params.id
    })
    return res.send(photo);
  } catch(error) {
    console.log(error);
    return res.sendStatus(500);
  }
});



//Testing Delete
/*
app.delete('/api/photos/:id', async (req, res) => {
  try {
    await Photo.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500)
  }
})
*/


module.exports = {
  model: Photo,
  routes: router,
}
