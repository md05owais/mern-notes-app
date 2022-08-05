const express = require("express");
const Router = express();

const {
  addNotes,
  allNotes,
  deleteById,
  editNotes,
} = require("../controller/services");

Router.post("/add", addNotes);
Router.get("/allNotes", allNotes);
Router.post("/deleteNote", deleteById);
Router.put("/updateNotes", editNotes);
module.exports = Router;
