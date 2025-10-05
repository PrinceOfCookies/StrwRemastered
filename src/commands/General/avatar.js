const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar") 
    .setDescription("Get a users avatar")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user")
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;
    if (!user) return;

    await interaction.reply({
      content: user.displayAvatarURL({ dynamic: true, size: 4096 }),
    });
  },
  color: "#DEADED",
};
