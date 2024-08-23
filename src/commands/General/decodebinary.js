const { SlashCommandBuilder } = require("discord.js");
const chalk = require("chalk");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("decodebin") // Reem is to seperate it from the other botban command (Old version, currently running)
    .setDescription("Decode text to binary")
    .addStringOption((option) =>
      option
        .setName("binary")
        .setDescription("The binary to Decode")
        .setRequired(true)
    ),
  async execute(interaction) {
    const binary = interaction.options.getString("binary");

    if (binary == null) {
      return await interaction.reply({
        content: "Text is null, please try again.",
        ephemeral: true,
      });
    }

    if (isNaN(parseInt(binary))) {
      return await interaction.reply({
        content: "Text is not binary, please try again.",
        ephemeral: true,
      });
    }

    const decoded = binary
      .split(" ")
      .map((x) => String.fromCharCode(parseInt(x, 2)))
      .join("");

    let embed = new EmbedBuilder()
      .setTitle(`Successfully encoded to binary!`)
      .setDescription(" ")
      .addFields(
        {
          name: "📁 ┇ Input",
          value: `\`\`\`\n${binary}\n\`\`\``,
          inline: true,
        },
        {
          name: "📁 ┇ Output",
          value: `\`\`\`\n${decoded}\n\`\`\``,
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
// Path: src/commands/tools/decode.js

// Basically stole their code.. just used my handler
