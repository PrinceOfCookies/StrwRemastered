const { SlashCommandBuilder } = require("discord.js");
const chalk = require("chalk");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("encodebin") // Reem is to seperate it from the other botban command (Old version, currently running)
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
        ephemeral: true,
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
  color: chalk.hex("#DEADED"),
};

// Credit to: https://github.com/Uo1428/ALL-IN-ONE-Discord-Bot-/blob/main
// Path: src/commands/tools/encode.js

// Basically stole their code.. just used my handler
