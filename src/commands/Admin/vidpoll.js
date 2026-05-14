const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");

const cooldowns = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vidpoll")
    .setDescription("Starts a poll for the last stored video of a channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction, client) {
    const channelID = "UCEG5VK8Qi_aiqgGypC-fEWw";
    client.CheckChannel = async (channelID) => {
      console.log(
        `Checking channel: https://www.youtube.com/feeds/videos.xml?channel_id=${channelID}`
      );
    };

    // Get last stored video
    const videoRows = await client.query(
      "SELECT * FROM videos WHERE channelID = ? ORDER BY ID DESC LIMIT 1",
      [channelID]
    );
    if (!videoRows.length) {
      await interaction.reply({
        content: "No videos found for this channel.",
        ephemeral: true,
      });
      return;
    }
    const video = videoRows[0];

    // Parse votes from JSON stored in DB
    let yesVotes = JSON.parse(video.yesVote || "[]");
    let noVotes = JSON.parse(video.noVote || "[]");

    const yesCount = yesVotes.length;
    const noCount = noVotes.length;

    const pollEmbed = new EmbedBuilder()
      .setColor(0x5fb041)
      .setTitle("Vote on the video!")
      .setDescription("What did you think of it? React with buttons below.")
      .setImage(video.thumbnail)
      .setAuthor({
        name: "lifeline4603",
        iconURL:
          "https://cdn.discordapp.com/avatars/890994028672319499/7750e3babbad5a777159c67668b3e649.webp",
        url: `https://www.youtube.com/channel/${channelID}`,
      })
      .setFooter({ text: `Title: ${video.title}` });

    // Create buttons with initial counts
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("vote_yes")
        .setLabel(`Yes (${yesCount})`)
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId("vote_no")
        .setLabel(`No (${noCount})`)
        .setStyle(ButtonStyle.Danger)
    );

    await interaction.reply({
      embeds: [pollEmbed],
      components: [row],
      ephemeral: false,
    });

    // Create collector on the reply message
    const message = await interaction.fetchReply();

    const collector = message.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 0, // no time limit
    });

    collector.on("collect", async (btnInteraction) => {
      const userId = btnInteraction.user.id;

      // 5s cooldown
      const now = Date.now();
      const cooldownKey = `${userId}:${video.ID}`;
      if (
        cooldowns.has(cooldownKey) &&
        now - cooldowns.get(cooldownKey) < 5000
      ) {
        await btnInteraction.reply({
          content: "Please wait 5 seconds between vote changes.",
          ephemeral: true,
        });
        return;
      }

      cooldowns.set(cooldownKey, now);

      // Reload votes from DB for concurrency
      const rows = await client.query(
        "SELECT yesVote, noVote FROM videos WHERE ID = ?",
        [video.ID]
      );
      if (!rows.length) {
        await btnInteraction.reply({
          content: "Video data not found.",
          ephemeral: true,
        });
        return;
      }
      let currentYes = JSON.parse(rows[0].yesVote || "[]");
      let currentNo = JSON.parse(rows[0].noVote || "[]");

      // Remove user from both arrays
      currentYes = currentYes.filter((id) => id !== userId);
      currentNo = currentNo.filter((id) => id !== userId);

      // Add user to chosen vote
      if (btnInteraction.customId === "vote_yes") {
        currentYes.push(userId);
      } else if (btnInteraction.customId === "vote_no") {
        currentNo.push(userId);
      }

      // Update DB
      await client.query(
        "UPDATE videos SET yesVote = ?, noVote = ? WHERE ID = ?",
        [JSON.stringify(currentYes), JSON.stringify(currentNo), video.ID]
      );

      // Update button labels with new counts
      const updatedRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("vote_yes")
          .setLabel(`Yes (${currentYes.length})`)
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId("vote_no")
          .setLabel(`No (${currentNo.length})`)
          .setStyle(ButtonStyle.Danger)
      );

      await btnInteraction.update({ components: [updatedRow] });
    });
  },

  color: "#DEADED",
  allowRoles: ["1137095530669932665"],
};
