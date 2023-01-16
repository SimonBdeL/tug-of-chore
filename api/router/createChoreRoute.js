const ChoreModel = require("../models/ChoreModel");

module.exports = async (req, res) => {
  const chore = new ChoreModel({
    text: req.body.text,
  });
  try {
    const newChore = await chore.save();
    res.status(201).json(newChore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
