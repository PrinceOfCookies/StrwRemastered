let RCON = require("srcds-rcon");

let rcon = RCON({
  address: process.env.RCON_HOST,
  password: process.env.RCON_PASSWORD,
});

module.exports = (client) => {
  client.rconCmd = async (cmd) => {
        let riddlesServer = await client.getSetting("riddlesServer");
    if (riddlesServer == false) return false

    let response = [];
    let commands = cmd
      .split(";")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    try {
      await rcon.connect();

      for (let i = 0; i < commands.length; i++) {
        try {
          let res = await rcon.command(commands[i], 3000);
          response.push(res);
        } catch (err) {
          console.error(`Error executing command "${commands[i]}":`, err);
        }
      }

      await rcon.disconnect();
    } catch (err) {
      console.error("RCON connection error:", err);
    }

    return response;
  };
};
