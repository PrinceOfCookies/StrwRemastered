const { readdirSync } = require("fs");
const { white } = require("chalk");

module.exports = (client) => {
  client.handleEvents = async () => {
    const eventFolders = readdirSync("./src/events");

    for (const folder of eventFolders) {
      const eventFiles = readdirSync(`./src/events/${folder}`).filter((file) =>
        file.endsWith(".js")
      );

      for (const file of eventFiles) {
        const start = Math.floor(Date.now());
        const event = require(`../../events/${folder}/${file}`);
        let color = event.color === undefined ? white : event.color;
        let name = event.name;

        switch (folder) {
          case "Client":
            if (event.once) {
              client.once(name, (...args) => event.execute(...args, client));
              break;
            }

            client.on(name, (...args) => event.execute(...args, client));
            client.fastLog(`${folder} Event`, color, name, start);
            break;
          case "SQL":
            // if (event.once) {
            //   client.connection.once(name, (...args) =>
            //     event.execute(...args, client)
            //   );
            // }

            // client.connection.on(name, (...args) =>
            //   event.execute(...args, client)
            // );
            // client.fastLog(`${folder} Event`, color, name, start);
            break;
          default:
            console.error(`Unknown event folder: ${folder}`);
            break;
        }
      }
    }
  };
};
