const { SlashCommandBuilder, EmbedBuilder, version } = require("discord.js");
const os = require("os");

const colors = [
  "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#C0C0C0",
  "#FFA500", "#800080", "#008000", "#808000", "#800000", "#000080", "#808080",
  "#008080", "#0000A0", "#000000", "#FF6347", "#FF7F50", "#FF8C00", "#FFA500",
  "#FFD700", "#FFFF00", "#ADFF2F", "#00FF00",
];

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function formatDuration(ms) {
  const sec = Math.floor(ms / 1000);
  const days = Math.floor(sec / 86400);
  const hrs = Math.floor((sec % 86400) / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const secs = sec % 60;
  return `${days}d ${hrs}h ${mins}m ${secs}s`;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status") 
    .setDescription("status someone"),
  async execute(interaction, client) {
    const uptime = formatDuration(client.uptime);
    const embed = new EmbedBuilder()
      .setTitle("Status: ONLINE")
      .setColor(randomColor())
      .addFields(
        { name: "👾 DJS Version", value: version, inline: true },
        { name: "🤖 Node Version", value: process.version, inline: true },
        { name: "⌚ Uptime", value: uptime, inline: false },
        { name: "🧠 Memory Usage", value: `${memUsed} / ${memTotal} MB`, inline: false },
        { name: "💻 OS", value: `${os.type()} ${os.release()} (${os.arch()})`, inline: false },
        { name: "⚙️ CPU", value: `\`\`\`md\n${cpuModel}\`\`\``, inline: false },
        { name: "🌐 API Latency", value: `${client.ws.ping}ms`, inline: true },
        { name: "📡 Client Ping", value: `${Date.now() - interaction.createdTimestamp}ms`, inline: true },
      );

    return await interaction.reply({
      embeds: [embed],
    });
  },
  color: "#DEADED",
};
