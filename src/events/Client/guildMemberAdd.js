/**
 * @file guildMemberAdd.js
 * @typedef {Object} Event
 * @property {string} name - The name of the event.
 * @property {function} execute - The function that executes when the event is triggered.
 * @property {string} color - The color of the event.
 */

const { mongoose } = require("mongoose");
const User = require("../../schemas/users.js");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    // Get the guild ID
    const guild = member.guild;
    if (!guild.id === "1120733358394200166") return;

    // Get the user from the member
    const user = member.user;
    let Profile = await User.findOne({ userID: user.id });

    if (!Profile) {
      Profile = new User({
        _id: mongoose.Types.ObjectId(),
        userID: user.id,
        createdAt: Date.now(),
        botBanned: false,
        balance: 25,
        hp: 100,
        xp: 0,
        level: 0,
        inventory: [],
        kills: [],
        deaths: [],
        commandsRan: {},
        vidpollvotes: {},
      });
      await Profile.save().catch((err) => console.log(err));
      console.log(`Created profile for ${user.id}`);
    }

    // Add this role to the user 1120733358759088231
    member.roles.add("1120733358759088231");
  },
  color: "lightGreen",
};
