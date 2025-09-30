const { readdirSync } = require("fs");
const { white } = require("chalk");

module.exports = (client) => {
  client.handleEvents = async () => {
    const eventFolders = readdirSync("./src/events");

    const registerEvent = (emitter, event, folder) => {
      const name = event.name;
      const color = event.color ?? white;

      const start = process.hrtime.bigint(); // ns

      if (event.once) {
        emitter.once(name, (...args) => event.execute(...args, client));
      } else {
        emitter.on(name, (...args) => event.execute(...args, client));
      }

      const end = process.hrtime.bigint();
      const durationMs = Number(end - start) / 1000000; // Convert to MS

      client.fastLog(`${folder} Event`, color, name, durationMs);
    };

    for (const folder of eventFolders) {
      const eventFiles = readdirSync(`./src/events/${folder}`).filter((file) =>
        file.endsWith(".js")
      );

      for (const file of eventFiles) {
        const event = require(`../../events/${folder}/${file}`);

        const target = event.type === "SQL" ? client.connection : client;
        if (!target) {
          console.error(`Unknown event target for ${file} in folder ${folder}`);
          continue;
        }

        registerEvent(target, event, folder);
      }
    }
  };
};
