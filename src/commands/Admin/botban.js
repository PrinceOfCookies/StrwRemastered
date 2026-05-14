const {
  SlashCommandBuilder,
  MessageFlags,
  PermissionFlagsBits,
} = require("discord.js");

const ADMIN_ROLE = "1137095530669932665";
const OWNER_ID = "698793333178368040";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botban")
    .setDescription("Botban a user from using the bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("User you want to bot ban")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const user = interaction.options.getUser("user");

    if (
      user.id === client.user.id ||
      user.id === interaction.user.id ||
      user.id === OWNER_ID ||
      (await client.createProfile(user.id, "botBanned"))
    ) {
      await interaction.reply({
        content: "You can't bot ban this user!",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    await client.query("UPDATE users SET botBanned = ? WHERE userID = ?", [
      true,
      user.id,
    ]);

    await interaction.reply({
      content: "Bot banned " + user.tag + " by " + interaction.user.username,
    });
  },
  color: "#DEADED",
  allowRoles: [ADMIN_ROLE],
};
