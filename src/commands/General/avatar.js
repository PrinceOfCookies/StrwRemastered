const { SlashCommandBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reemavatar")
    .setDescription("Get a users avatar")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user")
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    await interaction.reply({
      content: user.displayAvatarURL({ dynamic: true, size: 4096 }),
    });
  },
  color: chalk.hex("#DEADED"),
};
