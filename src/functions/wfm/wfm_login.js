const { user, email, password, WFM_JWT } = process.env;
const chalk = require("chalk");
const fetch = require("node-fetch"); // Ensure node-fetch is installed

module.exports = async (client) => {
  client.wfmlogin = async () => {
    let body = JSON.stringify({
      "auth_type": user, 
      "email": email,
      "password": password
    });

    let headers = {
      "Content-Type": "application/json",
      "Authorization": `JWT ${WFM_JWT}`
    };

    try {
      let response = await fetch("https://api.warframe.market/v1/auth/signin", {
        method: "POST",
        headers: headers,
        body: body
      });

      let data = await response.json();

      if (!response.ok) {
        console.log(`Failed to login. Code: ${response.status} Reason: ${data.reason}`);
        return;
      }

      console.log("Successfully logged in to Warframe Market");
      console.log(chalk.greenBright(`Successfully logged in as ${data.payload.user.ingame_name}`));
      client.WFMAccData = data;

    } catch (error) {
      console.error("Error during login:", error);
    }
  };
};
