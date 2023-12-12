const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reempurge")
    .setDescription("Clear a specific amount of messages from a channel.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of messages to clear.")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    ),

  async execute(interaction, client) {
    const { options } = interaction;

    const amount = options.getInteger("amount");

    const purge = new EmbedBuilder().setColor(0x5fb041);
    await channel.bulkDelete(amount, true).then((messages) => {
      purge.setDescription(
        `Succesfully deleted ${messages.size} messages from the channel.`
      );
      interaction.reply({ embeds: [purge], ephemeral: true });
    });
  },
  color: chalk.hex("#DEADED"),
  allowRoles: ["1137095530669932665"],
};
