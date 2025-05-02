const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("taglist") // Reem is to seperate it from the other botban command (Old version, currently running)
    .setDescription("Command to list the tags"),

  async execute(interaction, client) {
    await client.query("SELECT * FROM tags", async (err, data) => {
      if (err) {
        console.error(chalk.red("Error fetching tags: "), err);
        return await interaction.reply({
          content: "An error occurred while fetching the tags.",
          ephemeral: true,
        });
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
      TagList.setDescription(description);

      return await interaction.reply({
        embeds: [TagList],
      });
    });
  },
  cooldown: 30,
  color: "#DEADED",
};
