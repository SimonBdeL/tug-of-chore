const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const app = express();

mongoose
  // .connect("mongodb://127.0.0.1:27017/tug-of-chore", {
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", (err) => console.error(error));
db.once("open", () => console.log("connected to db"));

app.use(express.json());
app.use(cors());

const tugofchoreRouter = require("./routes");
app.use("/tugofchore", tugofchoreRouter);

// const TugOfChore = require("./models/tug-of-chore");

// app.get("/tug-of-chore", async (req, res) => {
//   const chores = await TugOfChore.find();
//   res.json(chores);
// });
// app.post("/tug-of-chore/new", async (req, res) => {
//   const chore = new TugOfChore({
//     text: req.params.text,
//   });
//   console.log(req);
//   chore.save();
//   res.json(chore);
// });

// app.delete("/tug-of-chore/delete/:id", async (req, res) => {
//   const result = await TugOfChore.findByIdAndDelete(req.params.id);
//   res.json(result);
// });

// app.get("/tug-of-chore/complete/:id", async (req, res) => {
//   console.log(req.params.id);
//   const chore = await TugOfChore.findById(req.params.id);
//   // console.log(chore);
//   chore.complete = !chore.complete;
//   chore.save();
//   res.json(chore);
// });

app.listen(3001, () => console.log("server started on port 3001"));
