const { Schema, model } = require("mongoose");

/**
 * Represents the schema for a user in the application.
 * @typedef {Object} userSchema
 * @property {Schema.Types.ObjectId} _id - The unique identifier for the user.
 * @property {string} userID - The ID of the user.
 * @property {number} createdAt - The timestamp when the user was created.
 * @property {boolean} botBanned - Indicates if the user is banned from using bots.
 * @property {number} balance - The user's balance.
 * @property {number} hp - The user's health points.
 * @property {number} xp - The user's experience points.
 * @property {number} level - The user's level.
 * @property {Array} inventory - The user's inventory.
 * @property {Array} kills - The list of kills made by the user.
 * @property {Array} deaths - The list of deaths of the user.
 * @property {Object} commandsRan - The commands executed by the user.
 * @property {Object} vidpollvotes - The votes made by the user in video polls.
 */
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
