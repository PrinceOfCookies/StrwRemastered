const { greenBright } = require("chalk");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const users = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

    console.log(greenBright(`Logged in as ${client.user.tag}!`));
    console.log(greenBright(`Serving ${users} members.`));
  },
  color: "#00FF00",
};
