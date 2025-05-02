const chalk = require("chalk");

module.exports = (client) => {
  client.claimdiscord = async (IDID, code) => {
    if ((await client.getSetting("riddlesServer")) == false) return false;

    let row,
      message,
      steamid = ".";
    IDID = IDID.toString();

    try {
      console.time("Query Execution Time");
      const result = await client.query(
        `SELECT steamid, discordid, code FROM discord_codes WHERE code = ?`,
        [code]
      );
      console.timeEnd("Query Execution Time");

      if (result.length === 0) {
        return ["Invalid code", 0];
      }

      row = result[0];

      const codeInDB = row.code || null;
      const discordIdInDB = row.discordid || null;
      const steamID = row.steamid || null;

      if (codeInDB !== code) {
        console.log(chalk.yellow("Code mismatch in the database."));
        return ["Invalid code", 0];
      }
      console.log;
      if (discordIdInDB != "0") {
        return ["Code already claimed", 0];
      }
      console.time("Query Execution Time");
      const updateResult = await client.query(
        `UPDATE discord_codes SET discordid = ? WHERE code = ?`,
        [IDID, code]
      );
      console.timeEnd("Query Execution Time");
      return ["Successfully linked your account!", steamID];
    } catch (err) {
      console.error(chalk.red("Database error: "), err);
      return ["An error occurred while linking your account.", 0];
    }
  };
};
