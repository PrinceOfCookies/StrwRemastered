/**
 * Defines the schema for the "tags" collection in the MongoDB database.
 * @typedef {Object} Tag
 * @property {Schema.Types.ObjectId} _id - The unique identifier for the tag.
 * @property {number} createdBy - The user ID of the creator of the tag.
 * @property {string} tagName - The name of the tag.
 * @property {string} tagContent - The content of the tag.
 * @property {number} uses - The number of times the tag has been used.
 */
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
