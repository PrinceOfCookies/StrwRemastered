const { Schema, model } = require("mongoose");

/**
 * @typedef {Object} ForumsSchema
 * @property {Schema.Types.ObjectId} _id - The unique identifier for the forum.
 * @property {string} threadID - The ID of the thread.
 * @property {string} title - The title of the forum.
 * @property {Object} author - The author of the forum.
 * @property {string} author.name - The name of the author.
 * @property {string} author.steamid - The Steam ID of the author.
 * @property {string} author.avatar - The avatar URL of the author.
 * @property {string} author.profile - The profile URL of the author.
 * @property {Object} originalPost - The original post of the forum.
 * @property {string} originalPost.content - The content of the original post.
 * @property {boolean} originalPost.edited - Indicates if the original post has been edited.
 * @property {Date} originalPost.editedAt - The date and time when the original post was last edited.
 * @property {Date} originalPost.createdAt - The date and time when the original post was created.
 * @property {Array} posts - An array of posts in the forum.
 */
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
