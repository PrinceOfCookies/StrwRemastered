const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits } = require("discord.js");

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
    const { options } = interaction;
    const user = await options.getUser("user");

    let banned = await client.createProfile(user.id, "botBanned");
    if (user == client.user || user == interaction.user || user.id == "698793333178368040" || banned) {
      return interaction.reply({content: "You can't bot ban this user!", flags: MessageFlags.Ephemeral});
    }
    await client.query(
      `UPDATE users SET botBanned = ? WHERE userID = ?`,
      [true, user.id]
    );

    await interaction.reply({
      content: `Bot banned ${user.tag} by ${interaction.user.username}`,
    });
  },
  color: "#DEADED",
  allowRoles: ["1137095530669932665"], // Strawhat OW Role
};
