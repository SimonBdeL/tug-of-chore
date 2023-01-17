const ChoreModel = require("../models/ChoreModel");

module.exports = async (req, res) => {
  const { id } = req.params;
  const chore = await ChoreModel.findById(id);
  chore.complete = !chore.complete;
  // chore.text = req.body.text;
  await chore.save();
  res.json(chore);
};
