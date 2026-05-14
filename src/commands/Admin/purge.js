const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Clear a specific amount of messages from a channel.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(option =>
      option
        .setName("amount")
        .setDescription("Amount of messages to clear.")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    ),
  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");
    const channel = interaction.channel;

    channel.bulkDelete(amount, true).then(messages => {
      interaction.reply({
        content: `Deleted ${messages.size} messages.`,
        flags: MessageFlags.Ephemeral
      });
    });
  }
};
