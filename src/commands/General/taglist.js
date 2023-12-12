const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const TagSchema = require(`../../schemas/tags`);
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reemtaglist")
    .setDescription("Command to list the tags"),

  async execute(interaction) {
    TagSchema.find({}, async (err, data) => {
      if (err) return console.log(err);
      if (!data.length) {
        interaction.reply({
          content: "There are currently no tags!",
        });
        return;
      }

      let description = "";

      const TagList = new EmbedBuilder()
        .setTitle("List of tags")
        .setDescription("No tags have been made yet");

      for (const dat of data) {
        description +=
          "- Tag Name: " +
          dat.tagName +
          "\nMade by: <@" +
          dat.createdBy +
          ">\n";
      }
      await TagList.setDescription(description);

      await interaction.reply({
        embeds: [TagList],
      });
    });
  },
  cooldown: 30,
  color: chalk.hex("#DEADED"),
};
