const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botban") // Reem is to seperate it from the other botban command (Old version, currently running)
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

    if (user == client.user) return interaction.reply({content: "You can't bot ban me!", flags: MessageFlags.Ephemeral});
    if (user == interaction.user) return interaction.reply({content: "You can't bot ban yourself!", flags: MessageFlags.Ephemeral});
    if (user.id == "698793333178368040") return interaction.reply({content: "You can't bot ban the bot owner!", flags: MessageFlags.Ephemeral});
    if (banned) return interaction.reply({content: "This user is already bot banned!", flags: MessageFlags.Ephemeral});

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
