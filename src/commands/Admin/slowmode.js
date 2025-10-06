const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("Sets slowmode")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(option =>
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
      content: "Channel slowmode has been set to " + time + " second(s) by " + interaction.user.tag,
    });
  },
  color: "#DEADED",
  allowRoles: ["1120733358784266302"],
};
