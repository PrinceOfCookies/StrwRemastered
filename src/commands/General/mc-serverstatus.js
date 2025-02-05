const { SlashCommandBuilder, MessageFlags, MessageFlags, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");
const { default: axios } = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mcstatus") // Reem is to seperate it from the other botban command (Old version, currently running)
    .setDescription("Check on the status of a minecraft server by the IP")
    .addStringOption((option) =>
      option
        .setName("ip")
        .setDescription("IP of the MC server")
        .setRequired(true)
    ),
  async execute(interaction) {
    const ip = interaction.options.getString("ip");

    if (ip == null) {
      return await interaction.reply({
        content: "IP is null, please try again.",
        flags: MessageFlags.Ephemeral,
      });
    }

    // use axios to get the data from api.mcsrvstat.us/2/ip

    let request = await axios.get(`https://api.mcsrvstat.us/2/${ip}`);
    let json = request.data;

    if (!json.players) {
      return await interaction.reply({
        content: "Error: couldn't find that server!",
        flags: MessageFlags.Ephemeral,
      });
    }

    let embed = new EmbedBuilder()
      .setTitle(`📁・${ip}`)
      .setThumbnail(`https://eu.mc-api.net/v3/server/favicon/${ip}`)
      .addFields(
        {
          name: "🟢┇Online",
          value: `${json.online ? "✅" : "❌"}`,
          inline: true,
        },
        {
          name: "👤┇Players online",
          value: `${json.players.online}/${json.players.max}`,
          inline: true,
        },
        {
          name: "\t",
          value: "\t",
          inline: true,
        },
        {
          name: "🏷️┇Version",
          value: `${json.version}`,
          inline: true,
        },
        {
          name: "📁┇Mod count",
          // Get the length of the mods.names array
          value: `${json.mods.names.length}`,
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
// Path: src/commands/tools/mcstatus.js

// Basically stole their code.. just used my handler
