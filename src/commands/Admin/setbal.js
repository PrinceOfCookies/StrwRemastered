const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reemsetbal") // Reem is to seperate it from the other botban command (Old version, currently running)
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

    const Profile = await client.checkProfile(user);

    const embed = new EmbedBuilder().setColor("#5FB041");

    await Profile.updateOne({ balance: balance });

    embed.setDescription(
      `Successfully set ${user.username}'s balance to ${balance}`
    );

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
  color: chalk.hex("#DEADED"),
  allowRoles: ["1137095530669932665"], // Strawhat OW Role
};
