const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readdirSync } = require("fs");
const { white, blue, yellow } = require("chalk");

module.exports = (client) => {
  client.handleCommands = async () => {
    const { commands, commandArray, cooldowns } = client;
    const commandFolders = readdirSync("./src/commands");

    for (let i = 0; i < commandFolders.length; i++) {
      const folder = commandFolders[i];
      const commandFiles = readdirSync(`./src/commands/${folder}`);
      for (let j = 0; j < commandFiles.length; j++) {
        const file = commandFiles[j];
        if (!file.endsWith(".js")) continue;

        const start = process.hrtime.bigint();
        const command = require(`../../commands/${folder}/${file}`);

        commands.set(command.data.name, command);
        cooldowns.set(command.data.name, new Map());
        commandArray.push(command.data.toJSON ? command.data.toJSON() : command.data);

        const end = process.hrtime.bigint();
        const durationMs = Number(end - start) / 1000000;
        await client.fastLog(`${folder} Command`, command.color || white, command.data.name, durationMs);
      }
    }

    const clientID = "1013168527831744534";
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    try {
      console.log(blue("Started refreshing application (/) commands."));
      const start = process.hrtime.bigint();
      await rest.put(Routes.applicationCommands(clientID), { body: commandArray });
      const end = process.hrtime.bigint();
      const durationMs = Number(end - start) / 1000000;
      console.log(`${blue("Successfully reloaded application (/) commands in ")}${yellow(durationMs.toFixed(3) + "ms")}`);
    } catch (er) {
      console.error(er);
    }
  };
};
