const userdatas = require("../models/userdata");
const { findNotesById } = require("./findById");
const { findAllNotes } = require("./findAllNotes");
const addNotes = async (req, res) => {
  try {
    let data = new userdatas(req.body);
    data = await data.save();
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `body and can't be empty`,
      });
    }
    return res.status(201).json({
      status: 201,
      data: data,
    });
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};
const allNotes = async (req, res, next) => {
  try {
    const allRecord = await userdatas.find();
    const count = allRecord.length;

    const { page, limit } = req.query;
    const nbPages = Math.ceil(count / limit);

    let result = await userdatas
      .find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    if (!result) {
      return res.status(404).json({
        status: 200,
        message: `You don't have any notes`,
      });
    }
    return res.status(201).json({
      status: 201,
      data: result,
      nbPages: nbPages,
    });
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: "not found",
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const result = await findNotesById(req.body._id);
    if (!result) {
      return res.status(401).json({
        status: 401,
        message: "Notes is not found",
      });
    }
    let data = await userdatas.deleteOne({ _id: req.body._id });
    if (data.acknowledged) {
      return res.status(201).json({
        status: 201,
        message: "Note deleted successfully",
      });
    } else {
      return res.status(501).json({
        status: 501,
        message: "Something went wrong try again!!!",
      });
    }
  } catch (err) {
    return res.status(501).json({
      status: 501,
      message: "Try again!!!",
    });
  }
};

const editNotes = async (req, res) => {
  const checkData = await findNotesById(req.body._id);
  if (!checkData) {
    return res.status(401).json({
      status: 401,
      message: "Notes is not found",
    });
  }

  let editedNote = await userdatas.updateOne(
    { _id: req.body._id },
    { $set: req.body }
  );

  if (editedNote.acknowledged) {
    return res.status(201).json({
      status: 201,
      message: "Note Updated successfully",
    });
  }
  return res.status(501).json({
    status: 501,
    message: "Something went wrong please try again!!!",
  });
};
module.exports = { addNotes, allNotes, deleteById, editNotes };
