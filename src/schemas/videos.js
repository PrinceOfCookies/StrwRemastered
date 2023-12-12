const { Schema, model } = require("mongoose");

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
