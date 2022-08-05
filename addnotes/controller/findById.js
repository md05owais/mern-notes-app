const userdatas = require("../models/userdata");

const findNotesById = async (data) => {
  try {
    const notesId = data;
    let result = await userdatas.findById({ _id: notesId });
    return result;
  } catch (err) {
    return false;
  }
};

module.exports = { findNotesById };
