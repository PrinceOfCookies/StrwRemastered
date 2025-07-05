const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const chalk = require("chalk");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("qrcode") 
    .setDescription("QRCode creation command")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("The text for the QR code")
        .setRequired(true)
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");

    await interaction.reply({
      content: `https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&data=${text.replace(
        new RegExp(" ", "g"),
        "%20"
      )}`,
      flags: MessageFlags.Ephemeral,
    });
  },
  color: "#DEADED",
};

// Credit to: https://github.com/Uo1428/ALL-IN-ONE-Discord-Bot-/blob/main
// Path: src/commands/tools/qrcode.js

// Basically stole their code.. just used my handler
