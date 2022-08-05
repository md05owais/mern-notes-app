const mongoose = require("mongoose");

const userdatas = mongoose.Schema({
  title: {
    type: String,
    allowNull: false,
  },
  tagline: {
    type: String,
    allowNull: true,
  },
  body: {
    type: String,
    allowNull: false,
  },
});

module.exports = mongoose.model("userdatas", userdatas);
