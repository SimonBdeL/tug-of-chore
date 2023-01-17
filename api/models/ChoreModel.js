const mongoose = require("mongoose");

const ChoreSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Chore", ChoreSchema);
