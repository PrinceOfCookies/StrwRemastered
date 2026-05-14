const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  MessageFlags
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setbal")
    .setDescription("Set a users balance.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addIntegerOption(option =>
      option
        .setName("balance")
        .setDescription("Amount of balance to set.")
        .setRequired(true)
    )
    .addUserOption(option =>
      option.setName("user").setDescription("User to set balance for.")
    ),
  async execute(interaction, client) {
    const user = interaction.options.getUser("user") || interaction.user;
    const balance = interaction.options.getInteger("balance");

    await client.query(
      "UPDATE users SET balance = ? WHERE user_id = ?",
      [balance, user.id]
    );

    const embed = new EmbedBuilder()
      .setColor(0x5FB041)
      .setDescription("Successfully set " + user.username + "'s balance to " + balance);

    return interaction.reply({
      embeds: [embed],
      flags: MessageFlags.Ephemeral,
    });
  },
  color: "#DEADED",
  allowRoles: ["1137095530669932665"],
};
