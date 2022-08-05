const userdatas = require("../models/userdata");

const findAllNotes = async () => {
  try {
    let result = await userdatas.find();
    let count = result.length;
    return result;
  } catch (err) {
    return false;
  }
};

module.exports = { findAllNotes };
