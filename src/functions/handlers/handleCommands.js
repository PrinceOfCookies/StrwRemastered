const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readdirSync } = require("fs");
const { white, blue, yellow } = require("chalk");

module.exports = (client) => {
  client.handleCommands = async () => {
    const { commands, commandArray, cooldowns } = client;
    const commandFolders = readdirSync("./src/commands");

    for (const folder of commandFolders) {
      const commandFiles = readdirSync(`./src/commands/${folder}`).filter((file) =>
        file.endsWith(".js")
      );

      for (const file of commandFiles) {
        const start = process.hrtime.bigint(); // ns
        const command = require(`../../commands/${folder}/${file}`);
        const properties = { folder, ...command };
        const name = command.data.name;
        const color = command.color || white;

        commands.set(name, properties);
        cooldowns.set(name, new Map());
        commandArray.push(command.data.toJSON());

        const end = process.hrtime.bigint();
        const durationMs = Number(end - start) / 1000000; // Convert to MS

        await client.fastLog(`${folder} Command`, color, name, durationMs);
      }
    }

    const clientID = "1013168527831744534";
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    try {
      console.log(blue("Started refreshing application (/) commands."));
      const start = process.hrtime.bigint(); // ns
      await rest.put(Routes.applicationCommands(clientID), { body: commandArray });
      const end = process.hrtime.bigint();
      const durationMs = Number(end - start) / 1000000; // Convert to MS
      console.log(blue(`Successfully reloaded application (/) commands in `) + yellow(`${durationMs.toFixed(3)}ms`));
    } catch (er) {
      console.error(er);
    }
  };
};
