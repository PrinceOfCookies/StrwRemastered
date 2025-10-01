module.exports = {
  name: "guildMemberBan",
  async execute(member) {
    if (!member.guild.id === "1120733358394200166") return;

    const bans = await member.guild.bans.fetch();
    const num = bans.size;

    await client.query(`UPDATE server SET bannedUserCount = ? WHERE id = ?`, [num, member.guild.id]);
    await fetch("https://princeofcookies.com/api/v1/bot/stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BOT_TOKEN}`,
      },
      body: JSON.stringify({ type: "bannedUsers", amount: num }),
    });
  },
  color: "#00FF00",
};
