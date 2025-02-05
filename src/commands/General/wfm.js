const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path2 = "json/wfm_item_orders.json";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wfm")
    .setDescription("Warframe market commands")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("check")
        .setDescription("Return info on the user (if its cookies)")
    )
    .addSubcommand((subcommand) => {
      subcommand
        .setName("orders")
        .setDescription("Find orders for a specific item")
        .addStringOption((option) => {
          option
            .setName("item")
            .setDescription("The item that you want to search for")
            .setRequired(true);
        });
    })
    .addSubcommand((subcommand) =>
      subcommand
        .setName("updateitemlist")
        .setDescription("Update the item list")
    ),
  async execute(interaction, client) {
    const subCommands = interaction.options.getSubcommand();

    switch (subCommands) {
      case "check":
        let user = client.WFMAccData.payload.user;
        if (!client.WFMAccData) return;
        if (interaction.user.id !== "698793333178368040") {
          return interaction.reply({
            content: "Youre not allowed to use this command, sorry.",
            flags: MessageFlags.Ephemeral,
          });
        }

        if (!user.ban_reason) user.ban_reason = "N/A";

        let userEmbed = new EmbedBuilder()
          .setTitle(`📁・${user.ingame_name}`)
          .addFields(
            {
              name: "Linked Accounts",
              value: `
              Steam: ${user.linked_accounts.steam_profile ? "True" : "False"}
              Patreon: ${
                user.linked_accounts.patreon_profile ? "True" : "False"
              }
              Xbox: ${user.linked_accounts.xbox_profile ? "True" : "False"}
              Discord: ${
                user.linked_accounts.discord_profile ? "True" : "False"
              }
              GitHub: ${user.linked_accounts.github_profile ? "True" : "False"}
              `,
              inline: true,
            },
            { name: "Role", value: user.role, inline: true },
            {
              name: "Unread Messages",
              value: user.unread_messages.toString(),
              inline: true,
            },
            {
              name: "Reputation",
              value: user.reputation.toString(),
              inline: true,
            },
            { name: "Platform", value: user.platform, inline: true }
          );

        await interaction.reply({
          embeds: [userEmbed],
          flags: MessageFlags.Ephemeral,
        });

        break;
      case "updateitemlist":
        if (!interaction.member.roles.cache.has("1137095530669932665")) {
          return interaction.reply({
            content: "You dont have the required role to use this command.",
            flags: MessageFlags.Ephemeral,
          });
        }

        await client.getWFMItems();

        //

        await interaction.reply({
          content: "Successfully updated the item list",
          flags: MessageFlags.Ephemeral,
        });
        break;
      case "orders":
        let choice = interaction.options.getString("item");
        await client.getItemOrders(choice);

        // Now get the file and the information from it, get the top 10 cheapest (from people online, then people offline, then more expensive) and put it in an embed
        let orders = JSON.parse(fs.readFileSync(path2));

        let orderEmbed = new EmbedBuilder()
          .setTitle(`📁・${choice}`)
          .setDescription("Top 10 orders")
          .setColor("#C25811");

        let onlineOrders = orders.filter(
          (order) =>
            order.visible &&
            order.order_type === "sell" &&
            order.user.status === "ingame"
        );
        let offlineOrders = orders.filter(
          (order) =>
            order.visible &&
            order.order_type === "sell" &&
            order.user.status === "offline"
        );
        let expensiveOrders = orders.filter(
          (order) =>
            order.visible &&
            order.order_type === "sell" &&
            order.user.status === "ingame"
        );

        onlineOrders.sort((a, b) => a.platinum - b.platinum);
        offlineOrders.sort((a, b) => a.platinum - b.platinum);
        expensiveOrders.sort((a, b) => b.platinum - a.platinum);

        let onlineOrdersTop10 = onlineOrders.slice(0, 10);
        let offlineOrdersTop10 = offlineOrders.slice(0, 10);
        let expensiveOrdersTop10 = expensiveOrders.slice(0, 10);

        orderEmbed.addField(
          "Online Orders",
          onlineOrdersTop10
            .map(
              (order) =>
                `Platinum: ${order.platinum} | Quantity: ${order.quantity} | User: ${order.user.ingame_name}`
            )
            .join("\n"),
          true
        );
        orderEmbed.addField(
          "Offline Orders",
          offlineOrdersTop10
            .map(
              (order) =>
                `Platinum: ${order.platinum} | Quantity: ${order.quantity} | User: ${order.user.ingame_name}`
            )
            .join("\n"),
          true
        );
        orderEmbed.addField(
          "Expensive Orders",
          expensiveOrdersTop10
            .map(
              (order) =>
                `Platinum: ${order.platinum} | Quantity: ${order.quantity} | User: ${order.user.ingame_name}`
            )
            .join("\n"),
          true
        );

        await interaction.reply({ embeds: [orderEmbed] });
        break;
      default:
        break;
    }
  },
  cooldown: 5,
  color: "#C25811",
};
