const chalk = require("chalk");

module.exports = {
  name: "ready",
  once: true,
  /**
   * Executes the ready event.
   * 
   * @param {Client} client - The Discord client.
   * @returns {Promise<void>}
   */
  async execute(client) {
    // Get how many guilds the bot is in and their names
    const guilds = client.guilds.cache.map((guild) => guild.name);
    console.log(`Guilds: ${guilds.join(", ")}`);
    client.checkForums();
  },
  color: chalk.greenBright,
};
