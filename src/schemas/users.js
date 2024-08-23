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
