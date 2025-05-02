const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  MessageFlags
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setbal") // Reem is to seperate it from the other botban command (Old version, currently running)
    .setDescription("Set a users balance.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addIntegerOption((option) =>
      option
        .setName("balance")
        .setDescription("Amount of balance to set.")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("User to set balance for.")
    ),
  async execute(interaction, client) {
    const { options } = interaction;

    const user = options.getUser("user") || interaction.user;
    const balance = options.getInteger("balance");
    const embed = new EmbedBuilder().setColor("#5FB041");

    await client.query(
      "UPDATE users SET balance = ? WHERE user_id = ?",
      [balance, user.id]
    );

    embed.setDescription(
      `Successfully set ${user.username}'s balance to ${balance}`
    );

    // interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    return await interaction.reply({
      embeds: [embed],
      flags: MessageFlags.Ephemeral,
    });
  },
  color: "#DEADED",
  allowRoles: ["1137095530669932665"], // Strawhat OW Role
};
