const { SlashCommandBuilder } = require("discord.js");
const TagSchema = require(`../../schemas/tags`);
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tag") // Reem is to seperate it from the other botban command (Old version, currently running)
    .setDescription("Command to use a tag")
    .addStringOption((option) =>
      option.setName("tagname").setDescription("Name Of Tag").setRequired(true)
    ),

  async execute(interaction) {
    const { options } = interaction;

    const tag_name = options.getString("tagname");
    let TagSchem = await TagSchema.findOne({
      tagName: tag_name,
    });

    if (!TagSchem) {
      return await interaction.reply({
        content: `Tag non existant!`,
      });
    } else {
      return await interaction.reply({
        content: TagSchem.tagContent,
      });
    }
  },
  cooldown: 10,
  color: chalk.hex("#DEADED"),
};
