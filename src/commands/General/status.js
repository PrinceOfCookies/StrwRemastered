const { SlashCommandBuilder, MessageEmbed, version } = require("discord.js");
const moment = require("moment");
const m = require("moment-duration-format");
const os = require("os");
const chalk = require("chalk");

const colors = [
  "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#C0C0C0",
  "#FFA500", "#800080", "#008000", "#808000", "#800000", "#000080", "#808080",
  "#008080", "#0000A0", "#000000", "#FF6347", "#FF7F50", "#FF8C00", "#FFA500",
  "#FFD700", "#FFFF00", "#ADFF2F", "#00FF00",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status") // Reem is to seperate it from the other botban command (Old version, currently running)
    .setDescription("status someone"),
  async execute(interaction, client) {
    function randomColor() {
      return colors[Math.floor(Math.random() * colors.length - 1)];
    }

    const uptime = moment.duration(client.uptime);
    const embed = new MessageEmbed()
      .setTitle("Status: ONLINE")
      .setColor(randomColor())
      .addFields(
        { name: "👾 DJS Version", value: version, inline: false },
        { name: "🤖 Node Version", value: process.version, inline: false },
        {
          name: "⌚️ Uptime",
          value: uptime.format(" D [days], H [hrs], m [mins], s [secs]"),
          inline: false,
        },
        {
          name: "Memory Usage",
          value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
          inline: false,
        },
        {
          name: "💻 OS",
          value: `${os.platform()} ${os.arch()}`,
          inline: false,
        },
        {
          name: "CPU",
          value: `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``,
          inline: false,
        },
        { name: "API Latency", value: `${client.ws.ping}ms`, inline: false },
        {
          name: "Client Ping",
          value: `${Date.now() - interaction.createdTimestamp}ms`,
          inline: false,
        }
      );

    return await interaction.reply({
      embeds: [embed],
    });
  },
  color: chalk.hex("#DEADED"),
};
