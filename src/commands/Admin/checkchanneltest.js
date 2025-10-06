const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  MessageFlags,
} = require("discord.js");

const choices = [
  ["PrinceOfCookies", "UCY4tt2c2QaqlJpA-x0PmPYg"],
  ["Lifeline", "UCEG5VK8Qi_aiqgGypC-fEWw"],
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cctfvp")
    .setDescription("Get the most recent video from a channel.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addStringOption((option) => {
      option
        .setName("channelid")
        .setDescription("Select the channel to check for new videos.")
        .setRequired(true);
      for (let i = 0; i < choices.length; i++) {
        option.addChoices({ name: choices[i][0], value: choices[i][1] });
      }
      return option;
    }),
  async execute(interaction, client) {
    const channelId = interaction.options.getString("channelid");
    const result = await client.checkChannel(channelId);
    if (!result || !result[0]) {
      return interaction.reply({
        content: "No new video found for this channel.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const embed = new EmbedBuilder();
    embed.setTitle("New Video Found for " + result[1] + "!");
    embed.setDescription(
      "A new video has been found for the channel with ID: " + channelId
    );
    embed.addFields({ name: "Video ID", value: result[0] });
    embed.setColor(0x00ff00);
    embed.setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
  color: "#DEADED",
  allowRoles: ["1120733358784266302"],
};
