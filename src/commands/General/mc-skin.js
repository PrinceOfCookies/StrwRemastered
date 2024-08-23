const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("mcskin") // Reem is to seperate it from the other botban command (Old version, currently running)
    .setDescription("Gets a players minecraft skin based off their name")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The players minecraft name")
        .setRequired(true)
    ),
  async execute(interaction) {
    const McName = interaction.options.getString("name");

    if (McName == null) {
      return await interaction.reply({
        content: "Name is null, please try again.",
        ephemeral: true,
      });
    }

    let embed = new EmbedBuilder()
      .setTitle(`📁・${McName}`)
      .setImage(`https://minotar.net/armor/body/${McName}/700.png`)
      .setFooter({ text: "Powered by mc-heads.net" });

    return await interaction.reply({
      embeds: [embed],
    });
  },
  color: chalk.hex("#DEADED"),
};

// Credit to: https://github.com/Uo1428/ALL-IN-ONE-Discord-Bot-/blob/main
// Path: src/commands/tools/qrcode.js

// Basically stole their code.. just used my handler
