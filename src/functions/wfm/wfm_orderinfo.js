const fs = require("fs");
const chalk = require("chalk");
const path = "src/json/wfm_item_orders.json";

module.exports = async (client) => {
  client.getItemOrders = async (itemName) => {
    try {
      let response = await fetch(`https://api.warframe.market/v1/items/${itemName}/orders`, { method: "GET", timeout: 5000 });
      let result = await response.json();

      if (!result.payload || !result.payload.orders) {
        throw new Error("Invalid response format or no orders found");
      }

      const cleanedresult = result.payload.orders.map(order => ({
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

      fs.writeFileSync(path, JSON.stringify(cleanedresult, null, 2));
      console.log(chalk.greenBright(`Successfully updated wfm_item_orders.json for item: ${itemName}`));

    } catch (error) {
      console.error(chalk.red("Error fetching item orders:"), error.message);
    }
  };
};
