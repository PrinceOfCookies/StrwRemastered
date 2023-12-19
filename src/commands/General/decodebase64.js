const { SlashCommandBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reemdecodebase64") // Reem is to seperate it from the other botban command (Old version, currently running)
    .setDescription("Decode base64")
    .addStringOption((option) =>
      option.setName("string").setDescription("The string to decode")
    ),
  async execute(interaction) {
    const string = interaction.options.getString("string");
    const decoded = Buffer.from(string, "base64").toString("ascii");
    return await interaction.reply({
      content: decoded,
    });
  },
  color: chalk.hex("#DEADED"),
};
