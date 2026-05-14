const {
  SlashCommandBuilder,
  MessageFlags,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("claimdiscord")
    .setDescription("Link your discord to ingame!")
    .addStringOption((option) =>
      option
        .setName("code")
        .setDescription("your claim discord code")
        .setRequired(true)
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

    let code = interaction.options.getString("code");
    if (code.length != 20) {
      return await interaction.reply({
        content: "Something went wrong while claiming your code!",
        flags: MessageFlags.Ephemeral,
      });
    }
    let info = await client.claimdiscord(
      interaction.user.id,
      interaction.options.getString("code")
    );
    claim = info[0];
    sid = info[1];
    if (!claim) claim = "Something went wrong while claiming your code!";

    await interaction.reply({
      content: claim,
      flags: MessageFlags.Ephemeral,
    });

    if (claim !== "Successfully linked your account!") return;

    let channel = client.channels.cache.get("1362092792691818637");
    let userInfo = await client.userinfo(null, sid);
    let tag = userInfo[0];
    let avatar = userInfo[1];
    let globalname = userInfo[2];
    let did = userInfo[3];
    let discordLinked = userInfo[4];
    let steamID32 = userInfo[5];
    let steamID64 = userInfo[6];
    let profileurl = userInfo[7];

    let embed = new EmbedBuilder()
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
      );

    // Add this role to them
    let role = interaction.guild.roles.cache.get("1365376378492420107");

    if (role) {
      let member = interaction.guild.members.cache.get(interaction.user.id);
      if (member) {
        await member.roles.add(role).catch(console.error);
      } else {
        console.log("Member not found in guild cache.");
      }
    }

    return channel.send({
      content: `Discord claimed by ${interaction.user.tag}`,
      embeds: [embed],
    });
  },
  color: "#DEADED",
};
