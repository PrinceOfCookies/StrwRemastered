const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("encodebin") 
    .setDescription("Encode text to binary")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("The text to encode")
        .setRequired(true)
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");

    if (text == null) {
      return await interaction.reply({
        content: "Text is null, please try again.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const encoded = text
      .split("")
      .map((x) => x.charcodeAt(0).toString(2))
      .join(" ");

    let embed = new EmbedBuilder()
      .setTitle(`Successfully encoded to binary!`)
      .setDescription(" ")
      .addFields(
        {
          name: "📁 ┇ Input",
          value: `\`\`\`\n${text}\n\`\`\``,
          inline: true,
        },
        {
          name: "📁 ┇ Output",
          value: `\`\`\`\n${encoded}\n\`\`\``,
          inline: true,
        }
      );

    return await interaction.reply({
      embeds: [embed],
    });
  },
  color: "#DEADED",
};

// Credit to: https://github.com/Uo1428/ALL-IN-ONE-Discord-Bot-/blob/main
// Path: src/commands/tools/encode.js

// Basically stole their code.. just used my handler
