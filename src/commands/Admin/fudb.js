const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fudb")
    .setDescription("Force update the database statistics")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const { guild } = interaction;
    function sendRequest(type, amount) {
      return fetch("https://princeofcookies.com/api/v1/bot/stats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BOT_TOKEN}`,
        },
        body: JSON.stringify({ type, amount }),
      });
    }

    const guildmembers = guild.memberCount;
    const bans = await guild.bans.fetch();
    const bannedusers = bans.size;

    await client.query(
      `UPDATE server SET bannedUserCount = ?, userCount = ? WHERE id = ?`,
      [bannedusers, guildmembers, guild.id]
    );
    await sendRequest("userCount", guildmembers);
    await sendRequest("bannedUsers", bannedusers);

    await interaction.reply({
      content: "IT HAS BEEN DONE!",
    });
  },
  color: "#DEADED",
  allowRoles: ["1120733358784266302"], // GA Role
};
