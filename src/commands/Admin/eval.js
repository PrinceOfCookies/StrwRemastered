const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  MessageFlags,
} = require("discord.js");

// Safe eval function
const safeEval = (code) => {
  // List of disallowed keywords for added security
  const bannedKeywords = [
    "process",
    "require",
    "fs",
    "child_process",
    "while",
    "for",
    "setInterval",
    "setTimeout",
    "import",
  ];

  // Check if code contains any banned keywords
  for (const keyword of bannedKeywords) {
    if (code.includes(keyword)) {
      throw new Error("This code contains disallowed keywords.");
    }
  }

  // Evaluate safely
  return eval(code); // This should be carefully reviewed if running in sensitive environments
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Evaluates JavaScript code.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) // Only admins by default
    .addStringOption((option) =>
      option
        .setName("code")
        .setDescription("The code to evaluate.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { options, member } = interaction;
    const code = options.getString("code");

    // Restrict to specific roles
    const allowedRoles = ["1120733358784266302"]; // Replace with actual allowed role IDs
    const hasPermission = member.roles.cache.some((role) =>
      allowedRoles.includes(role.id)
    );

    if (!hasPermission) {
      return interaction.reply({
        content: "You do not have permission to use this command.",
        flags: MessageFlags.Ephemeral,
      });
    }

    // Create an embed for the output
    const embed = new EmbedBuilder().setColor("5FB041");

    try {
      // Run the code through the safe eval function
      const result = safeEval(code);

      // Limit output length for display
      const output = String(result);
      embed
        .setTitle("Eval Result")
        .setDescription(`\`\`\`js\n${output.slice(0, 2000)}\n\`\`\``);
    } catch (error) {
      // Handle any errors in evaluation
      embed
        .setColor("FF0000")
        .setTitle("Error")
        .setDescription(`\`\`\`js\n${error.message.slice(0, 2000)}\n\`\`\``);
    }

    // Reply with the result embed
    await interaction.reply({ embeds: [embed] }); // flags: MessageFlags.Ephemeral
  },
  color: "#DEADED",
  allowRoles: ["1120733358784266302"], // GA Role
};
