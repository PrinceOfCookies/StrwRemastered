const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reemslowmode") // Reem is to seperate it from the other botban command (Old version, currently running)
    .setDescription("Sets slowmode")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("amount of time (in seconds) to set slowmode to")
        .setMinValue(0) // Min value is 0 (no slowmode)
        .setMaxValue(21600) // Max value is 21600 (6 hours)
        .setRequired(true)
    ),
  async execute(interaction) {
    const time = interaction.options.getInteger("time");

    interaction.channel.setRateLimitPerUser(time);

    return await interaction.reply({
      content: `Channel slowmode has been set to ${time} second(s) by ${interaction.user.tag}`,
    });
  },
  color: chalk.hex("#DEADED"),
  allowRoles: ["1120733358784266302"], // GA Role
};
