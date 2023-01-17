const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router();
const ChoreModel = require("../models/ChoreModel");

const readChoresRoute = require("./readChoresRoute");
const createChoreRoute = require("./createChoreRoute");
const updateChoreRoute = require("./updateChoreRoute");
const deleteChoreRoute = require("./deleteChoreRoute");

// login
router.post("/login", require("./loginRoute"));

// get all chores
router.get("/chores", isLoggedIn, readChoresRoute);

// create chore
router.post("/chores", isLoggedIn, createChoreRoute);

// update chore
router.put("/chores/:id", isLoggedIn, updateChoreRoute);
//delete
router.delete("/chores/:id", isLoggedIn, deleteChoreRoute);

// get one chore by id
// router.get("/:id", getChore, (req, res) => {
//   res.json(res.chore);
// });

// router.patch("/complete/:id", getChore, async (req, res) => {
//   res.chore.complete = !res.chore.complete;
//   try {
//     const updatedChore = await res.chore.save();
//     res.json(updatedChore);
//   } catch (err) {
//     res.statud(400);
//   }
// });

// delete chore
// router.delete("/:id", getChore, async (req, res) => {
//   try {
//     await res.chore.remove();
//     res.json({ message: "deleted chore" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// async function getChore(req, res, next) {
//   let chore;
//   try {
//     // console.log("getChore: req.params.id: ", req.params.id);
//     chore = await ChoreModel.findById(req.params.id);
//     // console.log("chore: ", chore);
//     if (chore == null) {
//       return res.status(404).json({ message: "Cannot find chore" });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }

//   res.chore = chore;
//   next();
// }

module.exports = router;
