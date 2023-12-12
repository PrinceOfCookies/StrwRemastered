const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const User = require(`../../schemas/users`);
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reembotban")
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

    switch (user) {
      case user == client.user:
        return interaction.reply({
          content: "You can't botban me!",
          ephemeral: true,
        });
      case user == interaction.user:
        return interaction.reply({
          content: "You can't botban yourself!",
          ephemeral: true,
        });
      case user.id == "698793333178368040":
        return interaction.reply({
          content: "You can't botban the bot owner!",
          ephemeral: true,
        });
      default:
        break;
    }

    if (!tUser) {
      return interaction.reply({
        content:
          "This user has not used the bot before so they have no profile!",
        ephemeral: true,
      });
    }

    if (tUser.botBanned)
      return interaction.reply({
        content: "This user is already bot banned!",
        ephemeral: true,
      });

    await tUser.updateOne({ botBanned: true });

    await interaction.reply({
      content: `Bot banned ${user.tag} by ${interaction.user.username}`,
    });
  },
  color: chalk.hex("#DEADED"),
  allowRoles: ["1137095530669932665"],
};
