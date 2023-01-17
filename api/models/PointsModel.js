const mongoose = require("mongoose");

const PointsSchema = new mongoose.Schema({
  points: {
    type: Number,
  },
});

module.exports = mongoose.model("Points", PointsSchema);
