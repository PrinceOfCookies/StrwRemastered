const { user, email, password, WFM_JWT } = process.env;
const chalk = require("chalk");

module.exports = async (client) => {
  client.wfmlogin = async () => {
    let body = JSON.stringify({
      auth_type: user,
      email: email,
      password: password,
    });

    let headers = {
      "Content-Type": "application/json",
      Authorization: `JWT ${WFM_JWT}`,
    };

    try {
      let response = await client.http(
        "https://api.warframe.market/v1/auth/signin",
        "POST",
        headers,
        body
      );

      console.log(
        chalk.greenBright(
          `Successfully logged in as ${response.payload.user.ingame_name}`
        )
      );
      client.WFMAccData = response;
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
};
