const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require("js");

const SETTING_RIDDLES_SERVER = 0;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setting")
    .setDescription("Change/Get bot settings")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addSubcommand((sub) =>
      sub
        .setName("get")
        .setDescription("Get a setting")
        .addIntegerOption((opt) =>
          opt
            .setName("setting")
            .setDescription("The setting to get")
            .setRequired(true)
            .addChoices({ name: "Riddles Server", value: SETTING_RIDDLES_SERVER })
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("set")
        .setDescription("Set a setting")
        .addIntegerOption((opt) =>
          opt
            .setName("setting")
            .setDescription("The setting to set")
            .setRequired(true)
            .addChoices({ name: "Riddles Server", value: SETTING_RIDDLES_SERVER })
        )
        .addBooleanOption((opt) =>
          opt
            .setName("value")
            .setDescription("The value to set the setting to")
            .setRequired(true)
        )
    ),

  async execute(interaction, client) {
    const options = interaction.options;
    const subcommand = options.getSubcommand();
    const setting = options.getInteger("setting");

    if (subcommand === "get" && setting === SETTING_RIDDLES_SERVER) {
      const riddlesServer = await client.getSetting("riddlesServer");
      return interaction.reply({
        content: `Riddles Server: ${riddlesServer}`,
        flags: MessageFlags.Ephemeral
      });
    }

    if (subcommand === "set" && setting === SETTING_RIDDLES_SERVER) {
      const value = Number(options.getBoolean("value"));
      await client.setSetting("riddlesServer", value);
      return interaction.reply({
        content: `Riddles Server set to ${value}`,
        flags: MessageFlags.Ephemeral
      });
    }
  },
  color: "#DEADED",
  allowRoles: ["1137095530669932665"],
};
