let vids = require("../../schemas/videos");
let {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");

module.exports = {
  name: "ready",
  async execute(client) {
    // Run client.checkChannel(UCEG5VK8Qi_aiqgGypC) every 5 minutes and check channel UCY4tt2c2QaqlJpA-x0PmPYg
    await setInterval(async () => {
      let newVideo = await client.checkChannel("UCEG5VK8Qi_aiqgGypC-fEWw");
      if (!newVideo)
        newVideo = await client.checkChannel("UCY4tt2c2QaqlJpA-x0PmPYg");
      if (!newVideo) return;
      let IDD = newVideo;

      let video = await vids.findOne({ ID: IDD });
      if (!video) {
        console.log(newVideo);
        return console.error("Video not found");
      }
      if (video.used) return console.error("Video already used");
      switch (video.channelID) {
        case "UCEG5VK8Qi_aiqgGypC-fEWw":
          // vids.updateOne({ ID: IDD }, { used: true });
          // console.log(`Set \`used\` to true for ${video.ID}`)
          // let staffchatchannel = await client.channels.cache.get(
          //   "1120733360604594198"
          // );
          // let videoschannel = await client.channels.cache.get(
          //   "1120733359786709008"
          // );

          // let postButton = new ActionRowBuilder().addComponents(
          //   new ButtonBuilder()
          //     .setCustomId("post")
          //     .setLabel("Post Video Poll")
          //     .setEmoji("✔")
          //     .setStyle(ButtonStyle.Success),

          //   new ButtonBuilder()
          //     .setCustomId("nopost")
          //     .setLabel("No Video Poll")
          //     .setEmoji("❌")
          //     .setStyle(ButtonStyle.Danger)
          // );

          // let disabledPostButton = new ActionRowBuilder().addComponents(
          //   new ButtonBuilder()
          //     .setCustomId("post")
          //     .setLabel("Post Video Poll")
          //     .setEmoji("✔")
          //     .setStyle(ButtonStyle.Success)
          //     .setDisabled(true),

          //   new ButtonBuilder()
          //     .setCustomId("nopost")
          //     .setLabel("No Video Poll")
          //     .setEmoji("❌")
          //     .setStyle(ButtonStyle.Danger)
          //     .setDisabled(true)
          // );

          // let message = await staffchatchannel.send({
          //   content: `New video from ${video.author}`,
          //   components: [postButton],
          // });

          // let Collector = message.createMessageComponentCollector({
          //   ComponentType: ComponentType.Button,
          //   time: "600000",
          // });

          // Collector.on("collect", async (btn) => {
          //   if (btn.customId === "post") {
             

          //     let newCollector = nmsg.createMessageComponentCollector({
          //       ComponentType: ComponentType.Button,
          //       time: "600000",
          //     });

          break;
        case "UCY4tt2c2QaqlJpA-x0PmPYg":
          vids.updateOne({ ID: IDD }, { used: true });
          break;
      }
      // Get the videos channelID 1120733359786709008 1120733359786709008
    }, 30000);
    //300000;
  },
  color: "lightGreen",
};
