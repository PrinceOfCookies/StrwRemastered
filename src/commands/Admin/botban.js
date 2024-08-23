const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const User = require(`../../schemas/users`);
const chalk = require("chalk");

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

    let tUser = await User.findOne({ userID: user.id });

    if (user == client.user) return interaction.reply({content: "You can't bot ban me!", ephemeral: true});
    if (user == interaction.user) return interaction.reply({content: "You can't bot ban yourself!", ephemeral: true});
    if (user.id == "698793333178368040") return interaction.reply({content: "You can't bot ban the bot owner!", ephemeral: true});
    if (!tUser) return interaction.reply({content: "This user has not used the bot before so they have no profile!", ephemeral: true});
    if (tUser.botBanned) return interaction.reply({content: "This user is already bot banned!", ephemeral: true});

    await tUser.updateOne({ botBanned: true });

    await interaction.reply({
      content: `Bot banned ${user.tag} by ${interaction.user.username}`,
    });
  },
  color: chalk.hex("#DEADED"),
  allowRoles: ["1137095530669932665"], // Strawhat OW Role
};
