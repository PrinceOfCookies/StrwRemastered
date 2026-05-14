const fs = require("fs");
const chalk = require("chalk");
const path = "src/json/wfm_items.json";

module.exports = async (client) => {
  client.getWFMItems = async () => {
    try {
      const response = await fetch("https://api.warframe.market/v1/items", { method: "GET", timeout: 5000 });
      const result = await response.json();

      if (!result.payload || !result.payload.items) {
        throw new Error("Invalid response format");
      }

      const cleanedresult = {};
      result.payload.items.forEach((item) => {
        cleanedresult[item.item_name] = item.url_name;
      });

      if (!fs.existsSync("json")) {
        fs.mkdirSync("json");
      }

      fs.writeFileSync(path, JSON.stringify(cleanedresult, null, 2));
      console.log(chalk.greenBright("Successfully updated wfm_items.json"));
    } catch (error) {
      console.error(chalk.red("Error fetching items:"), error.message);
    }
  };
};
