const {
  MessageFlags,
} = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    async function replySafe(payload) {
      if (interaction.deferred || interaction.replied) {
        return interaction.followUp(payload);
      }

      return interaction.reply(payload);
    }

    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName, user } = interaction;
      const command = commands.get(commandName);

      const banned = await client.createProfile(user.id, "botBanned");
      if (banned || !command) return;

      try {
        if (
          command.allowRoles &&
          !command.allowRoles.some((role) =>
            interaction.member.roles.cache.has(role)
          )
        ) {
          return await interaction.reply({
            content: "You don't have the required role to use this command!",
            flags: MessageFlags.Ephemeral,
          });
        }

        if (command.cooldown) {
          const key = `${user.id}-${commandName}`;
          const now = Date.now();
          const expires = client.cooldowns.get(key);

          console.log(expires, now);
          if (expires && expires > now) {
            const remaining = Math.ceil((expires - now) / 1000);
            return await interaction.reply({
              content: `You are on cooldown for this command! Please wait ${remaining} second(s).`,
              flags: MessageFlags.Ephemeral,
            });
          }

          const expireTime = Date.now() + command.cooldown * 1000;

          console.log(`Setting cooldown for ${key} to expire at ${expireTime}`);

          client.cooldowns.set(key, expireTime);
          setTimeout(
            () => client.cooldowns.delete(key),
            command.cooldown * 1000
          );
        }

        // Execute command
        await command.execute(interaction, client);
        await client.incrementCommandRun(user.id, commandName);
        const curCommandsRan = await client.query(
          `SELECT commandsRan FROM server WHERE id = ?`,
          [interaction.guild.id]
        );
        const commandsRan = Number(curCommandsRan[0]?.commandsRan ?? 0) + 1;
        await client.query(`UPDATE server SET commandsRan = ? WHERE id = ?`, [
          commandsRan,
          interaction.guild.id,
        ]);
        await fetch("https://princeofcookies.com/api/v1/bot/stats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.BOT_TOKEN}`,
          },
          body: JSON.stringify({ type: "commandsRan", amount: commandsRan }),
        });
      } catch (error) {
        console.error(error);
        return await replySafe({
          content: "Something went wrong while executing this command!",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  },
  color: "#ff0000",
};
