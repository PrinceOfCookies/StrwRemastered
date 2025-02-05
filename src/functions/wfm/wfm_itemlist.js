const fs = require("fs");
const chalk = require("chalk");
const path = "json/wfm_items.json";

module.exports = async (client) => {
  client.getWFMItems = async () => {
    try {
      const result = await client.http(
        "https://api.warframe.market/v1/auth/signin",
        "GET",
        { timeout: 5000 }
      );

      let data = result.data;
      if (!data.payload || !data.payload.items) {
        throw new Error("Invalid response format");
      }

      const cleanedData = {};
      data.payload.items.forEach((item) => {
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
