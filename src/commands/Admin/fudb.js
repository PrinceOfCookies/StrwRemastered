const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fudb") 
    .setDescription("Force update the database statistics")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
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
    
    const guildmembers = interaction.guild.memberCount;
    const bans = await member.guild.bans.fetch();
    const bannedusers = bans.size;

    await client.query(
      `UPDATE server SET bannedUserCount = ?, userCount = ? WHERE id = ?`,
      [bannedusers, guildmembers, interaction.guild.id]
    );
    await sendRequest("userCount", guildmembers);
    await sendRequest("bannedUsers", bannedusers);
  },
  color: "#DEADED",
  allowRoles: ["1120733358784266302"], // GA Role
};
