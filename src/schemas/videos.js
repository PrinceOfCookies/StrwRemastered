const { Schema, model } = require("mongoose");

/**
 * Video schema for storing video information.
 *
 * @typedef {Object} vidSchema
 * @property {Schema.Types.ObjectId} _id - The unique identifier of the video.
 * @property {string} channelID - The ID of the channel the video belongs to.
 * @property {string} ID - The ID of the video.
 * @property {string} title - The title of the video.
 * @property {string} author - The author of the video.
 * @property {string} link - The link to the video.
 * @property {string} thumbnail - The URL of the video's thumbnail.
 * @property {string} channelURL - The URL of the channel.
 * @property {boolean} used - Indicates if the video has been used.
 * @property {Array} noVote - An array of votes indicating "no".
 * @property {Array} yesVote - An array of votes indicating "yes".
 */
const vidSchema = new Schema({
  _id: Schema.Types.ObjectId,
  channelID: String,
  ID: String,
  title: String,
  author: String,
  link: String,
  thumbnail: String,
  channelURL: String,
  used: Boolean,
  noVote: Array,
  yesVote: Array,
});

module.exports = model("vids", vidSchema, "Videos");
