const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("encodebin")
    .setDescription("Encode text to binary")
    .addStringOption(option =>
      option
        .setName("text")
        .setDescription("The text to encode")
        .setRequired(true)
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    
    const encoded = [...text]
      .map(char => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");

    const embed = new EmbedBuilder()
      .setTitle("Successfully encoded to binary!")
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

    return interaction.reply({ embeds: [embed] });
  },
  color: "#DEADED",
};
