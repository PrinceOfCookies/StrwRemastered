const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const chalk = require("chalk");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("foot") 
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
      flags: MessageFlags.Ephemeral,
    });
  },
  color: "#DEADED",
};