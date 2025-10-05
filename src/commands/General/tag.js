const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tag") 
    .setDescription("Command to use a tag")
    .addStringOption((option) =>
      option.setName("tagname").setDescription("Name Of Tag").setRequired(true)
    ),

  async execute(interaction, client) {
    const { options } = interaction;

    const tag_name = options.getString("tagname");

    let tag = await client.query(
      `SELECT tagContent FROM tags WHERE tagName = ?`, [tag_name]
    );

    if (!tag[0]) {
      return await interaction.reply({
        content: `Tag non existant!`,
      });
    } else {
      return await interaction.reply({
        content: tag[0].tagContent,
      });
    }
  },
  cooldown: 5,
  color: "#DEADED",
};
