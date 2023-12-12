const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reemnick")
    .setDescription("Sets someones nickname")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames)
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("User whos name you want to change")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("nickname")
        .setDescription("What you want to set this users nickname to")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const { options } = interaction;

    const user = options.getUser("user");
    const Nick = options.getString("nickname");

    if (Nick.length > 25) {
      return await interaction.reply({
        content:
          "That nickname is to long! Try something under 25 characters please",
        ephermeral: true,
      });
    }

    const GuildMember = interaction.member;

    if (!GuildMember) {
      return await interaction.reply({
        content: "User is not in a guild!",
        ephemeral: true,
      });
    }

    await GuildMember.setNickname(Nick);

    interaction.reply({
      content: `Nickname of ${user.tag} set to \`${Nick}\` by ${interaction.user.tag}`,
    });
  },
  color: chalk.hex("#DEADED"),
  allowRoles: ["1137095530669932665"],
};
