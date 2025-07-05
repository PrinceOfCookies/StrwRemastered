const {
  SlashCommandBuilder,
  MessageFlags,
  AttachmentBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rcon")
    .setDescription("Run an RCON command on the server")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName("command")
        .setDescription("The RCON command to run")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("hidden")
        .setDescription(
          "If the response will have sensitive info, set this to true!"
        )
    ),
  async execute(interaction, client) {
    let riddlesServer = await client.getSetting("riddlesServer");
    if (riddlesServer == false) {
      return await interaction.reply({
        content:
          "This command is disabled right now, if you think this is a mistake, please contact Lifeline, or PrinceOfCookies.",
        flags: MessageFlags.Ephemeral,
      });
    }
    let command = interaction.options.getString("command");
    const hidden = interaction.options.getBoolean("hidden") || false;
    let fullCommand = null;

    if (!command) {
      return interaction.reply({
        content: "No command provided!",
        flags: MessageFlags.Ephemeral,
      });
    }

    // If the command has ulx in it, convert it to be like `lua_run RunConsoleCOmmand("ulx", "second", "third")` ect

    if (command.includes("ulx")) {
      const commandParts = command.split(" ").map((part) => `"${part}"`);
      command = `lua_run RunConsoleCommand(${commandParts.join(", ")})`;
    }

    try {
      const result = await client.rconCmd(command);

      if (!result || result.length === 0) {
        return interaction.reply({
          content: "No response from server.",
          flags: MessageFlags.Ephemeral,
        });
      }

      const output = result.join("\n");

      if (output.length <= 2000) {
        return await interaction.reply({
          content: output,
          ...(hidden && { flags: MessageFlags.Ephemeral }),
        });
      } else {
        const buffer = Buffer.from(output, "utf-8");
        const file = new AttachmentBuilder(buffer, { name: "rcon_output.txt" });

        return await interaction.reply({
          content: "Output was too large, sent as a file instead:",
          files: [file],
          ...(hidden && { flags: MessageFlags.Ephemeral }),
        });
      }
    } catch (err) {
      console.error(err);
      return interaction.reply({
        content: "There was an error running the RCON command.",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
  color: "#DEADED",
  allowRoles: ["1120733358784266302"], // GA Role
};
