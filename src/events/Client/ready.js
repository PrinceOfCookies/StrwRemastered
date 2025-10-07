const { greenBright } = require("chalk");

module.exports = {
  name: "clientReady",
  once: true,
  async execute(client) {
    const guild = client.guilds.cache.get("1120733358394200166");
    const users = guild ? guild.memberCount : 0;

    console.log(greenBright(`Logged in as ${client.user.tag}!`));
    console.log(greenBright(`Serving ${users} members.`));
  },
  color: "#00FF00",
};
