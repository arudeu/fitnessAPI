const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  duration: {
    type: String,
    required: [true, "Duration is Required"],
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);
