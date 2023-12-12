const { Schema, model } = require("mongoose");

const forumsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  threadID: String,
  title: String,
  author: {
    type: Object,
    default: {
        name: String,
        steamid: String,
        avatar: String,
        profile: String,
    }
  },
  originalPost: {
    type: Object,
    default: {
        content: String,
        edited: Boolean,
        editedAt: Date,
        createdAt: Date,
    }
  },
  posts: {
    type: Array,
    default: [],
  },
});

module.exports = model("forums", forumsSchema, "Forums");
