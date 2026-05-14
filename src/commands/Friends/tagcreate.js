const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tagcreate")
    .setDescription("Command to Create a tag")
    .addStringOption((option) =>
      option
        .setName("tagname")
        .setDescription("Name Of Tag")
        .setRequired(true)
        .setMaxLength(100)
    )
    .addStringOption((option) =>
      option
        .setName("tagcontent")
        .setDescription("Contents of the tag")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const { options } = interaction;

    const tag_name = options.getString("tagname");
    const tag_content = options.getString("tagcontent");
    let tag = await client.query(
      `SELECT createdBy FROM tags WHERE tagName = ?`,
      [tag_name]
    );

    if (tag[0]) {
      return interaction.reply({
        content: `A tag with the name ${tag_name} already exists, it was made by <@${tag[0].createdBy}> on!`,
      });
    } else {
      await client.query(
        `INSERT INTO tags (tagName, tagContent, createdBy) VALUES (?, ?, ?)`,
        [tag_name, tag_content, interaction.user.id]
      );
    }

    await interaction.reply({
      content: `Tag ${tag_name} successfully created!`,
    });
  },
  color: "#DEADED",
  allowRoles: [
    "1120733358759088236", // Friends role
    "1120733358784266302", // GA role
    "1137095530669932665", // Strawhat OW role
  ],
};
