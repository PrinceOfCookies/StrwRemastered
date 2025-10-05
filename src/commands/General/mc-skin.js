const { SlashCommandBuilder, MessageFlags, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mcskin") 
    .setDescription("Gets a players minecraft skin based off their name")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The players minecraft name")
        .setRequired(true)
    ),
  async execute(interaction) {
    const McName = interaction.options.getString("name");

    let embed = new EmbedBuilder()
      .setTitle(`📁・${McName}`)
      .setImage(`https://minotar.net/armor/body/${McName}/700.png`)
      .setFooter({ text: "Powered by mc-heads.net" });

    return await interaction.reply({
      embeds: [embed],
    });
  },
  color: "#DEADED",
};

// Credit to: https://github.com/Uo1428/ALL-IN-ONE-Discord-Bot-/blob/main
// Path: src/commands/tools/qrcode.js

// Basically stole their code.. just used my handler
