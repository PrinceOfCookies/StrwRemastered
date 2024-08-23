const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readdirSync } = require("fs");
const { green, white, blue, yellow } = require("chalk");

module.exports = (client) => {
  client.handleCommands = async () => {
    const { commands, commandArray, cooldowns } = client;
    const commandFolders = readdirSync("./src/commands");

    for (const folder of commandFolders) {
      let start = Math.floor(Date.now());
      const commandFiles = readdirSync(`./src/commands/${folder}`).filter(
        (file) => file.endsWith(".js")
      );

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        const properties = { folder, ...command };
        let name = command.data.name;
        let color = command.color;

        if (!color) {
          color = white;
          console.error("No color provided for command: " + name);
        }

        commands.set(command.data.name, properties);
        cooldowns.set(command.data.name, new Map());
        commandArray.push(command.data.toJSON());

        await client.fastLog(`${folder} Command`, color, name, start)
      }
    }

    const clientID = "1013168527831744534";
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    try {
      console.log(blue("Started refreshing application (/) commands."));
      const start = Math.floor(Date.now());
      await rest.put(Routes.applicationCommands(clientID), {
        body: commandArray,
      });
      const end = Math.floor(Date.now());
      console.log(
        blue("Successfully reloaded application (/) commands in ") +
          yellow(end - start + "ms")
      );
    } catch (er) {
      console.error(er);
    }
  };
};
