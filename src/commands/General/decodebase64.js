const { SlashCommandBuilder } = require("discord.js");
const chalk = require("chalk");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("reemdecodebase64")
    .setDescription("Decode base64")
    .addStringOption((option) =>
      option.setName("string").setDescription("The string to decode")
    ),
  async execute(interaction) {
    const string = interaction.options.getString("string");
    const decoded = Buffer.from(string, "base64").toString("ascii");
    await interaction.reply({
      content: decoded,
    });
  },
  color: chalk.hex("#DEADED")
};
