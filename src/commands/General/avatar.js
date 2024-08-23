const { SlashCommandBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar") // Reem is to seperate it from the other botban command (Old version, currently running)
    .setDescription("Get a users avatar")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user")
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;

    if (!user) return interaction.reply({ content: "User not found!", ephemeral: true }); 

    return await interaction.reply({
      content: user.displayAvatarURL({ dynamic: true, size: 4096 }),
    });
  },
  color: chalk.hex("#DEADED"),
};
