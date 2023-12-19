const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reempurge") // Reem is to seperate it from the other botban command (Old version, currently running)
    .setDescription("Clear a specific amount of messages from a channel.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of messages to clear.")
        .setRequired(true)
        .setMinValue(1) // Min value is 1
        .setMaxValue(100) // Max value is 100
    ),
  async execute(interaction) {
    const { options } = interaction;

    const amount = options.getInteger("amount");

    const purge = new EmbedBuilder().setColor("5FB041");
    await channel.bulkDelete(amount, true).then((messages) => {
      purge.setDescription(
        `Succesfully deleted ${messages.size} messages from the channel.`
      );
      interaction.reply({ embeds: [purge], ephemeral: true });
    });
  },
  color: chalk.hex("#DEADED"),
  allowRoles: ["1120733358784266302"], // GA Role
};
