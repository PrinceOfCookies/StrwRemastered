const { readdirSync } = require("fs");
const chalk = require("chalk");
const { connection } = require("mongoose");

module.exports = (client) => {
  client.handleEvents = async () => {
    const eventFolders = readdirSync("./src/events");

    for (const folder of eventFolders) {
      const eventFiles = readdirSync(`./src/events/${folder}`).filter((file) =>
        file.endsWith(".js")
      );
      let lightGreen = chalk.hex("#90EE90");

      switch (folder) {
        case "Client":
          for (const file of eventFiles) {
            const start = Math.floor(Date.now());
            const event = require(`../../events/${folder}/${file}`);
            let color = event.color;
            let name = event.name;

            if (color == undefined) {
              color = chalk.white;
              console.error("No color provided for event: " + name);
            }

            if (color === "lightGreen") color = lightGreen;
            if (event.once) {
              client.once(name, (...args) => event.execute(...args, client));
              return await client.fastLog(`${folder} Event`, color, name, start);
            }

            client.on(name, (...args) => event.execute(...args, client));
            await client.fastLog(`${folder} Event`, color, name, start);
          }
          break;
        case "Mongo":
          for (const file of eventFiles) {
            const start = Math.floor(Date.now());
            const event = require(`../../events/${folder}/${file}`);
            let color = event.color;
            let name = event.name;

            if (color == "lightGreen") color = lightGreen;

            if (event.once) {
              connection.once(name, (...args) =>
                event.execute(...args, client)
              );
              return await client.fastLog(`${folder} Event`, color, name, start);
            }

            connection.on(name, (...args) => event.execute(...args, client));
            await client.fastLog(`${folder} Event`, color, name, start);
          }
          break;

        default:
          console.log("Invalid event: " + folder);
          break;
      }
    }
  };
};
