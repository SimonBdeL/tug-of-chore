const mongoose = require("mongoose");

const choresSchema = new mongoose.Schema({
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

// const TugOfChoreSchema = new Schema({
//   text: {
//     type: String,
//     required: true,
//   },
//   complete: {
//     type: Boolean,
//     default: false,
//   },
//   timestamp: {
//     type: String,
//     default: Date.now(),
//   },
// });

module.exports = mongoose.model("Chores", choresSchema);
