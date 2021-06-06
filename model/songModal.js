const mongoose = require("mongoose");

const musicScheema = new mongoose.Schema({
  song: {
    type: String,
    max: "50",
    min: "3",
    required: true,
  },
  artist: {
    type: String,
    max: "50",
    min: "3",
    required: true,
  },
  album: {
    type: String,
    max: "50",
    min: "3",
    required: true,
  },
  scale: {
    type: String,
    max: "50",
    min: "3",
    required: true,
  },
  chords: {
    type: String,
    max: "50",
    min: "3",
    required: true,
  },
  chordPattern: {
    type: String,
    max: "50",
    min: "3",
    required: true,
  },
});

module.exports = mongoose.model("music", musicScheema);
