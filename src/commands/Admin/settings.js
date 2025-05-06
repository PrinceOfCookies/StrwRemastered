const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setting") // Reem is to seperate it from the other botban command (Old version, currently running)
    .setDescription("Change/Get bot settings")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("get")
        .setDescription("Get a setting")
        .addStringOption((option) =>
          option
            .setName("setting")
            .setDescription("The setting to get")
            .setRequired(true)
            .addChoices({ name: "Riddles Server", value: "riddlesServer" })
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("set")
        .setDescription("Set a setting")
        .addStringOption((option) =>
          option
            .setName("setting")
            .setDescription("The setting to set")
            .setRequired(true)
            .addChoices({ name: "Riddles Server", value: "riddlesServer" })
        )
        .addBooleanOption((option) =>
          option
            .setName("value")
            .setDescription("The value to set the setting to")
            .setRequired(true)
        )
    ),

  async execute(interaction, client) {
    const options = interaction.options;
    const subcommand = options.getSubcommand();

    const setting = options.getString("setting");

    switch (subcommand) {
      case "get":
        if (setting === "riddlesServer") {
          const riddlesServer = await client.getSetting("riddlesServer");
          return interaction.reply({
            content: `Riddles Server: ${riddlesServer}`,
            flags: MessageFlags.Ephemeral
          });
        }

        break;
      case "set":
        if (setting === "riddlesServer") {
          const value = Number(options.getBoolean("value"));
          
          await client.setSetting("riddlesServer", value);
          return interaction.reply({
            content: `Riddles Server set to ${value}`,
            flags: MessageFlags.Ephemeral
          });
        }
        break;
    }
  },
  color: "#DEADED",
  allowRoles: ["1137095530669932665"], // Strawhat OW Role
};
