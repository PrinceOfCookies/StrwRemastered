const { SlashCommandBuilder, MessageFlags } = require("discord.js");

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
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=1024x1024&data=${encodeURIComponent(
      text
    )}`;

    await interaction.reply({
      content: url,
      flags: MessageFlags.Ephemeral,
    });
  },
  color: "#DEADED",
};

// Credit to: https://github.com/Uo1428/ALL-IN-ONE-Discord-Bot-/blob/main
// Path: src/commands/tools/qrcode.js

// Basically stole their code.. just used my handler
