/**
 * Handles loading and registering commands for the Discord bot.
 * @param {Object} client - The Discord bot client.
 */
// Use CommonJS
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readdirSync } = require("fs");
const { green, white, blue, yellow } = require("chalk");

module.exports = (client) => {
  client.handleCommands = async () => {
    const { commands, commandArray, cooldowns } = client;
    const commandFolders = readdirSync("./src/commands");

    for (const folder of commandFolders) {
      let s = Math.floor(Date.now());
      const commandFiles = readdirSync(`./src/commands/${folder}`).filter(
        (file) => file.endsWith(".js")
      );
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        const properties = { folder, ...command };
        let name = command.data.name;
        let color = command.color;

        if (color == undefined) {
          color = white;
          console.error("No color provided for command: " + name);
        }

        console.log(color("TEST"))

        commands.set(command.data.name, properties);
        cooldowns.set(command.data.name, new Map());
        commandArray.push(command.data.toJSON());

        console.log(
          `${await client.color("#b3b3b3", "[")}${green(
            `${folder} Command`
          )}${await client.color("#b3b3b3", "]")} ${color(
            name
          )} ${await client.color("#b3b3b3", "loaded in")} ${yellow(
            Date.now() - s + "ms"
          )}`
        );
      }
    }

    const clientID = "1013168527831744534";
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    try {
      console.log(blue("Started refreshing application (/) commands."));
      const s = Math.floor(Date.now());
      await rest.put(Routes.applicationCommands(clientID), {
        body: commandArray,
      });
      const e = Math.floor(Date.now());
      console.log(
        blue("Successfully reloaded application (/) commands in ") +
          yellow(e - s + "ms")
      );
    } catch (er) {
      console.error(er);
    }
  };
};
