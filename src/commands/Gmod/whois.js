const {
  SlashCommandBuilder,
  MessageFlags,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("whois")
    .setDescription("Get a user's info")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user")
    )
    .addStringOption((option) =>
      option.setName("steamid").setDescription("The SteamID")
    ),

  async execute(interaction, client) {
    let riddlesServer = await client.getSetting("riddlesServer");
    if (!riddlesServer) {
      return await interaction.reply({
        content:
          "This command is disabled right now, if you think this is a mistake, please contact Lifeline, or PrinceOfCookies.",
        flags: MessageFlags.Ephemeral,
      });
    }
    const options = interaction.options;

    let user = options.getUser("user");
    let steamID = options.getString("steamid");

    if (!user && !steamID) user = interaction.user;
    let userid = user ? user.id : null;
    if (user && steamID) steamid = null; // Prefer user over steamid
    if (!user && steamID) userid = null;

    let userInfo = await client.userinfo(userid, steamID);
    let tag = userInfo[0];
    let avatar = userInfo[1];
    let globalname = userInfo[2];
    let did = userInfo[3];
    let discordLinked = userInfo[4];
    let steamID32 = userInfo[5];
    let steamID64 = userInfo[6];
    let profileurl = userInfo[7];

    if (user) {
      tag = user.tag || "Not linked";
      avatar = user.displayAvatarURL() || null;
      globalname = user.globalName || user.tag;
      did = user.id || "Not linked";
    }

    embed = new EmbedBuilder()
      .setColor("#DEADED")
      .setTitle("User Info")
      .setAuthor({
        name: tag,
        iconURL:
          avatar ||
          "https://i.imgur.com/jVgGJIe_d.jpeg?maxwidth=520&shape=thumb&fidelity=high",
      })
      .addFields(
        { name: "Username", value: globalname, inline: true },
        { name: "ID", value: did, inline: true },
        {
          name: "Discord Linked",
          value: discordLinked ? "Yes" : "No",
          inline: false,
        },
        { name: "Steam ID", value: steamID32, inline: true },
        {
          name: "Steam ID64",
          value: steamID64,
          inline: true,
        },
        {
          name: "Steam profile",
          value: profileurl,
          inline: false,
        }
      )
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    return interaction.reply({ embeds: [embed] });
  },

  color: "#DEADED",
};
