module.exports = {
  name: "guildMemberAdd",
  async execute(member, client) {
    if (member.guild.id !== "1120733358394200166") return;

    const users = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

    await client.createProfile(member.user.id);
    member.roles.add("1120733358759088231");

    await client.query(`UPDATE server SET userCount = ? WHERE id = ?`, [users, member.guild.id]);
    await fetch("https://princeofcookies.com/api/v1/bot/stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BOT_TOKEN}`,
      },
      body: JSON.stringify({ type: "userCount", amount: users }),
    });
  },
  color: "#00FF00",
};
