const express = require("express");
const router = express.Router();
const Chore = require("../models/tug_of_chore");

// get all chores
router.get("/", async (req, res) => {
  try {
    const chores = await Chore.find();
    res.json(chores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get one chore by id
router.get("/:id", getChore, (req, res) => {
  res.json(res.chore);
});

// create chore
router.post("/", async (req, res) => {
  const chore = new Chore({
    text: req.body.text,
  });

  try {
    const newChore = await chore.save();
    res.status(201).json(newChore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// update chore
router.patch("/complete/:id", getChore, async (req, res) => {
  res.chore.complete = !res.chore.complete;
  try {
    const updatedChore = await res.chore.save();
    res.json(updatedChore);
  } catch (err) {
    res.statud(400);
  }
});

// delete chore
router.delete("/:id", getChore, async (req, res) => {
  try {
    await res.chore.remove();
    res.json({ message: "deleted chore" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getChore(req, res, next) {
  let chore;
  try {
    // console.log("getChore: req.params.id: ", req.params.id);
    chore = await Chore.findById(req.params.id);
    // console.log("chore: ", chore);
    if (chore == null) {
      return res.status(404).json({ message: "Cannot find chore" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.chore = chore;
  next();
}

module.exports = router;
