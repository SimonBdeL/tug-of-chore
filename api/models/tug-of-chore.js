const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TugOfChoreSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  assigned_to: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    default: Date.now(),
  }
})

const TugOfChore = mongoose.model('TugOfChore', TugOfChoreSchema);
module.exports = TugOfChore;