const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  MessageFlags,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cctfvp")
    .setDescription("Get the most recent video from a channel.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addStringOption((option) =>
      option
        .setName("channelid")
        .setDescription("The ID of the channel to clear messages from.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const { options } = interaction;

    const channelId = options.getString("channelid");

    let vidID = await client.checkChannel(channelId);
    if (!vidID) {
      return interaction.reply({
        content: "No new video found for this channel.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle("New Video Found!")
      .setDescription(
        `A new video has been found for the channel with ID: ${channelId}`
      )
      .addFields({
        name: "Video ID",
        value: vidID,
      })
      .setColor("#00FF00")
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
  color: "#DEADED",
  allowRoles: ["1120733358784266302"], // GA Role
};
