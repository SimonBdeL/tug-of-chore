const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/tug-of-chore", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('connected to Mongo DB'))
  .catch(console.err);

const TugOfChore = require('./models/tug-of-chore');

app.get('/tug-of-chore', async (req, res) => {
  const chores = await TugOfChore.find();
  res.json(chores);
})
app.post('/tug-of-chore/new', async (req, res) => {
  const chore = new TugOfChore({
    text: req.body.text
  });
  chore.save();
  res.json(chore)
});

app.listen(3000, () => console.log('server started on port 3000'));
