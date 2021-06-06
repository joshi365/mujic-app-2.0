const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },

  instrument: {
    type: String,
    max: 55,
    min: 4,
  },
  location: {
    type: String,
    max: 55,
    min: 3,
  },
  skills: {
    type: [String],
  },
});

module.exports = mongoose.model("profile", profileSchema);
