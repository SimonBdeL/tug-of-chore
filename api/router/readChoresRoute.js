const ChoreModel = require("../models/ChoreModel");
module.exports = async (req, res) => {
  try {
    const chores = await ChoreModel.find();
    res.json(chores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
