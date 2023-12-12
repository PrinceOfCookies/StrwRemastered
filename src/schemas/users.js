/**
 * Mongoose schema for the "users" collection.
 * @typedef {Object} User
 * @property {string} userID - The user's ID.
 * @property {number} createdAt - The timestamp of when the user was created.
 * @property {boolean} botBanned - Whether the user is banned from using the bot.
 * @property {number} balance - The user's balance.
 * @property {number} hp - The user's health points.
 * @property {number} xp - The user's experience points.
 * @property {number} level - The user's level.
 * @property {Array} inventory - The user's inventory.
 * @property {Array} kills - The user's kill history.
 * @property {Array} deaths - The user's death history.
 * @property {Object} commandsRan - The user's command history.
 */
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userID: String,
  createdAt: Number,
  botBanned: {
    type: Boolean,
    default: false,
  },
  balance: {
    type: Number,
    default: 25,
  },
  hp: {
    type: Number,
    default: 100,
  },
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
  inventory: {
    type: Array,
    default: [],
  },
  kills: {
    type: Array,
    default: [],
  },
  deaths: {
    type: Array,
    default: [],
  },
  commandsRan: {
    type: Object,
    default: {},
  },
  vidpollvotes: {
    type: Object,
    default: {},
  },
});

module.exports = model("users", userSchema, "Users");
