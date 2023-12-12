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
      // light grey hex

      switch (folder) {
        case "Client":
          for (const file of eventFiles) {
            const s = Math.floor(Date.now());
            const event = require(`../../events/${folder}/${file}`);
            let color = event.color;
            let name = event.name;

            if (color == undefined) {
              color = chalk.white
              console.error("No color provided for event: " + name);
            }

            if (color === "lightGreen") color = lightGreen;
            if (event.once) {
              client.once(name, (...args) => event.execute(...args, client));
              console.log(
                `${await client.color("#b3b3b3", "[")}${chalk.green(
                  `${folder} Event`
                )}${await client.color("#b3b3b3", "]")} ${color(
                  name
                )} ${await client.color("#b3b3b3", "loaded in")} ${chalk.yellow(
                  Date.now() - s + "ms"
                )}`
              );
            } else {
              client.on(name, (...args) => event.execute(...args, client));
              console.log(
                `${await client.color("#b3b3b3", "[")}${chalk.green(
                  `${folder} Event`
                )}${await client.color("#b3b3b3", "]")} ${color(
                  name
                )} ${await client.color("#b3b3b3", "loaded in")} ${chalk.yellow(
                  Date.now() - s + "ms"
                )}`
              );
            }
          }
          break;
        case "Mongo":
          for (const file of eventFiles) {
            const s = Math.floor(Date.now());
            const event = require(`../../events/${folder}/${file}`);
            let color = event.color;
            let name = event.name;

            if (color == "lightGreen") color = lightGreen;
            if (event.once) {
              connection.once(name, (...args) =>
                event.execute(...args, client)
              );
              console.log(
                `${await client.color("#b3b3b3", "[")}${chalk.green(
                  `${folder} Event`
                )}${await client.color("#b3b3b3", "]")} ${color(
                  name
                )} ${await client.color("#b3b3b3", "loaded in")} ${chalk.yellow(
                  Date.now() - s + "ms"
                )}`
              );
            } else {
              connection.on(name, (...args) => event.execute(...args, client));
              console.log(
                `${await client.color("#b3b3b3", "[")}${chalk.green(
                  `${folder} Event`
                )}${await client.color("#b3b3b3", "]")} ${color(
                  name
                )} ${await client.color("#b3b3b3", "loaded in")} ${chalk.yellow(
                  Date.now() - s + "ms"
                )}`
              );
            }
          }
          break;

        default:
          console.log("Invalid event: " + folder);
          break;
      }
    }
  };
};
