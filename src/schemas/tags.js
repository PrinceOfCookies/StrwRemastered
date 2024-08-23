const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const tagSchema = new Schema({
  _id: Schema.Types.ObjectId,
  createdBy: Number,
  tagName: String,
  tagContent: String,
  uses: Number,
});

module.exports = model("tags", tagSchema, "Tags");
