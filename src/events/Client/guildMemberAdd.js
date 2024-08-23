const chalk = require("chalk");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    if (!member.guild.id === "1120733358394200166") return;

    await client.createProfile(member.user.id)

    member.roles.add("1120733358759088231");
  },
  color: chalk.greenBright,
};
