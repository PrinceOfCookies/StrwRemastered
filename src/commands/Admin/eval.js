const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  MessageFlags,
} = require("discord.js");

const bannedKeywords = new Set([
  "process",
  "require",
  "fs",
  "child_process",
  "while",
  "for",
  "setInterval",
  "setTimeout",
  "import",
]);

function safeEval(code) {
  for (const keyword of bannedKeywords) {
    if (code.indexOf(keyword) !== -1) {
      throw new Error("This code contains disallowed keywords.");
    }
  }
  return eval(code);
}

const allowedRoles = ["1120733358784266302"];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Evaluates JavaScript code.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName("code")
        .setDescription("The code to evaluate.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const code = interaction.options.getString("code");

    let hasPermission = false;
    const roles = interaction.member.roles.cache;
    for (const role of roles.values()) {
      if (allowedRoles.indexOf(role.id) !== -1) {
        hasPermission = true;
        break;
      }
    }

    if (!hasPermission) {
      return interaction.reply({
        content: "You do not have permission to use this command.",
        flags: MessageFlags.Ephemeral,
      });
    }

    const embed = new EmbedBuilder();
    embed.setColor("5FB041");

    try {
      const result = safeEval(code);
      let output = typeof result === "string" ? result : "" + result;
      if (output.length > 2000) output = output.slice(0, 2000);
      embed.setTitle("Eval Result");
      embed.setDescription("```js\n" + output + "\n```");
    } catch (error) {
      let msg = error && error.message ? error.message : "Unknown error";
      if (msg.length > 2000) msg = msg.slice(0, 2000);
      embed.setColor("FF0000");
      embed.setTitle("Error");
      embed.setDescription("```js\n" + msg + "\n```");
    }

    await interaction.reply({ embeds: [embed] });
  },
  color: "#DEADED",
  allowRoles: allowedRoles,
};
