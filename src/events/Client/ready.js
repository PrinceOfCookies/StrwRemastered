const chalk = require("chalk");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(chalk.greenBright(`Logged in as ${client.user.tag}!`));

    const guilds = client.guilds.cache.size;
    const users = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

    console.log(chalk.greenBright(`Serving ${users} users in ${guilds} servers.`));
  },
  color: chalk.greenBright,
};
