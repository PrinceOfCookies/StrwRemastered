const { SlashCommandBuilder } = require("discord.js");
const TagSchema = require(`../../schemas/tags`);
const mongoose = require("mongoose");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reemtagcreate")
    .setDescription("Command to Create a tag")
    .addStringOption((option) =>
      option.setName("tagname").setDescription("Name Of Tag").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("tagcontent")
        .setDescription("Contents of the tag")
        .setRequired(true)
    ),

  async execute(interaction) {
    const { options } = interaction;

    const tag_name = options.getString("tagname");
    const tag_content = options.getString("tagcontent");
    let TagSchem = await TagSchema.findOne({
      tagName: options.getString("tagname"),
    });

    if (TagSchem) {
      return interaction.reply({
        content: `A tag with the name ${tag_name} already exists, it was made by <@${TagSchem.createdBy}> on!`,
      });
    } else {
      TagSchem = await new TagSchema({
        _id: mongoose.Types.ObjectId(),
        createdBy: interaction.user.id,
        tagName: tag_name,
        tagContent: tag_content,
      });
    }

    await interaction.reply({
      content: `Tag ${tag_name} successfully created!`,
    });

    await TagSchem.save().catch(console.error);
  },
  color: chalk.hex("#DEADED"),
  allowRoles: [
    "1120733358759088236", // Friends role
    "1120733358784266302", // GA role
    "1137095530669932665", // Strawhat OW role
  ],
};
