const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");

// COMMAND IS CURRENT DISABLED

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reemvidpoll") // Reem is to seperate it from the other botban command (Old version, currently running)
    .setDescription("[DISABLED] Starts a poll for the video")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction, client) {
    return interaction.reply({
      content: "This command is disabled.",
      ephemeral: true,
    });

    await client.checkVideos();
    const rawData = fs.readFileSync(`${__dirname}/../../json/checkvideos.json`);

    const jsonData = JSON.parse(rawData);

    const Poll = new EmbedBuilder({
      color: 0x5fb041,
      title: "Vote on the video!",
      description:
        "What did you think of it? Click the reactions below to vote",
      image: {
        url: jsonData.url,
      },
      author: {
        name: jsonData.author,
        iconURL:
          "https://cdn.discordapp.com/avatars/890994028672319499/7750e3babbad5a777159c67668b3e649.webp",
        url: `https://www.youtube.com/@Lifeline4603/sub_confirmation=1`,
      },
      footer: {
        text: `Title: ${jsonData.title}`,
      },
    });

    // channel
    //   .send({
    //     embeds: [Poll],
    //   })
    //   .then(function (message) {
    //     message.react("👍");
    //     message.react("👎");
    //   });

    // return await interaction.reply({
    //   content: "Poll Posted",
    //   ephemeral: true,
    // });
  },
  color: chalk.hex("#DEADED"),
  allowRoles: ["1137095530669932665"], // Strawhat OW Role
};
