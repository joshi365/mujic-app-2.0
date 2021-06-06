const mongoose = require("mongoose");
const userScheema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    min: 3,
  },
  number: {
    type: String,
    required: true,
    max: 10,
    min: 10,
  },
  password: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  email: {
    type: String,
    max: 255,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userScheema);
