const { SlashCommandBuilder } = require("discord.js");
const chalk = require("chalk");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("reemfoot") // Reem is to seperate it from the other botban command (Old version, currently running)
    .setDescription("Foot someone"),
  async execute(interaction) {
    interaction.channel.messages.fetch({ limit: 1 }).then((messages) => {
      messages.first().react("🦶");
      messages.first().react("⬅️");
      messages.first().react("🇫");
      messages.first().react("🇴");
      messages.first().react("0️⃣");
      messages.first().react("🇹");
    });

    await interaction.reply({
      content: "Footed",
      ephemeral: true,
    });
  },
  color: chalk.hex("#DEADED"),
};


const { SlashCommandBuilder } = require("discord.js");
const chalk = require("chalk");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("monkey")
    .setDescription("Monkey react someone"),
  async execute(interaction) {
    interaction.channel.messages.fetch({ limit: 1 }).then((messages) => {
      messages.first().react("🐒");
      messages.first().react("⬅");
      // Spell out monkey in reactions
      messages.first().react("🇲");
      messages.first().react("🇴");
      messages.first().react("🇳");
      messages.first().react("🇰");
      messages.first().react("🇪");
      messages.first().react("🇾");
    });

    await interaction.reply({
      content: "They've been monkey'd! 🐒",
      ephemeral: true,
    });
  },
  color: chalk.hex("#DEADED"),
};
