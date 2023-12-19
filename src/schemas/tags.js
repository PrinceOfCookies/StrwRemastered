const mongoose = require("mongoose");

const { Schema, model } = mongoose;

/**
 * Represents the schema for a tag.
 *
 * @typedef {Object} TagSchema
 * @property {Schema.Types.ObjectId} _id - The unique identifier for the tag.
 * @property {number} createdBy - The user ID of the creator of the tag.
 * @property {string} tagName - The name of the tag.
 * @property {string} tagContent - The content of the tag.
 * @property {number} uses - The number of times the tag has been used.
 */
const tagSchema = new Schema({
  _id: Schema.Types.ObjectId,
  createdBy: Number,
  tagName: String,
  tagContent: String,
  uses: Number,
});

module.exports = model("tags", tagSchema, "Tags");
