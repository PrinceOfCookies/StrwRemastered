const fs = require("fs");
const fetch = require("node-fetch");
const chalk = require("chalk");
const path = "json/wfm_items.json";

module.exports = async (client) => {
  client.getWFMItems = async () => {
    try {
      let result, secondBody;
      [result, secondBody] = await client.fetch("https://api.warframe.market/v1/auth/signin", {}, null, 5000);

      if (result.code < 200 || result.code >= 300) {
        return console.log("Failed to fetch items. Code: " + result.code + " Reason: " + result.reason);
      }

      let data = JSON.parse(secondBody);
      if (!data.payload || !data.payload.items) {
        throw new Error("Invalid response format");
      }

      const cleanedData = {};
      data.payload.items.forEach(item => {
        cleanedData[item.item_name] = item.url_name;
      });

      if (!fs.existsSync("json")) {
        fs.mkdirSync("json");
      }

      fs.writeFileSync(path, JSON.stringify(cleanedData, null, 2));
      console.log(chalk.greenBright("Successfully updated wfm_items.json"));
    } catch (error) {
      console.error(chalk.red("Error fetching items:"), error.message);
    }
  };
};
