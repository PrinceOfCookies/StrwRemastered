const { SlashCommandBuilder, MessageFlags, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mcstatus") 
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

    let request = await fetch(`https://api.mcsrvstat.us/2/${ip}`);
    let json = await request.json();

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
