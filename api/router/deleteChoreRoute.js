const ChoreModel = require("../models/ChoreModel");

module.exports = async (req, res) => {
  const { id } = req.params;
  console.log("id from router:", id);
  const chore = await ChoreModel.findById(id);
  await chore.remove();
  res.status(204).send(id);
};
