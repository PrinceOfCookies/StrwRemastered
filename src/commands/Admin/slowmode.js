const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reemslowmode")
    .setDescription("Sets slowmode")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("amount of time (in seconds) to set slowmode to")
        .setMinValue(0)
        .setMaxValue(21600)
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
  allowRoles: ["1137095530669932665"],
};
