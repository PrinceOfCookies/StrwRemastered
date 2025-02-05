const fs = require("fs");
const fetch = require("node-fetch");
const chalk = require("chalk");
const path = "json/wfm_item_orders.json";

module.exports = async (client) => {
  client.getItemOrders = async (itemName) => {
    try {
      let result, secondBody;
      [result, secondBody] = await client.fetch(`https://api.warframe.market/v1/items/${itemName}/orders`, {}, null, 5000);

      if (result.code < 200 || result.code >= 300) {
        return console.log("Failed to fetch orders. Code: " + result.code + " Reason: " + result.reason);
      }

      let data = JSON.parse(secondBody);
      if (!data.payload || !data.payload.orders) {
        throw new Error("Invalid response format or no orders found");
      }

      const cleanedData = data.payload.orders.map(order => ({
        platinum: order.platinum,
        quantity: order.quantity,
        order_type: order.order_type,
        platform: order.platform,
        creation_date: new Date(order.creation_date).getTime(), // Unix timestamp
        last_update: new Date(order.last_update).getTime(), // Unix timestamp
        subtype: order.subtype || null, // If applicable
        visible: order.visible,
        user: {
          ingame_name: order.user.ingame_name,
          status: order.user.status,
          reputation: order.user.reputation,
          last_seen: new Date(order.user.last_seen).getTime(), // Unix timestamp
        },
      }));

      if (!fs.existsSync("json")) {
        fs.mkdirSync("json");
      }

      fs.writeFileSync(path, JSON.stringify(cleanedData, null, 2));
      console.log(chalk.greenBright(`Successfully updated wfm_item_orders.json for item: ${itemName}`));

    } catch (error) {
      console.error(chalk.red("Error fetching item orders:"), error.message);
    }
  };
};
