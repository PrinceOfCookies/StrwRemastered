const {
  MessageFlags,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
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
        let curCommandsRan = await client.query(
          `SELECT commandsRan FROM server WHERE id = ?`,
          [interaction.guild.id]
        );
        let commandsRan = curCommandsRan[0].commandsRan;
        commandsRan++;
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
        return await interaction.reply({
          content: "Something went wrong while executing this command!",
          flags: MessageFlags.Ephemeral,
        });
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return;

      async function handleVote(video, userId, voteType) {
        const opposite = voteType === "yesVote" ? "noVote" : "yesVote";
        if (video[voteType].includes(userId)) return false; // already voted
        if (video[opposite].includes(userId)) {
          video[opposite] = video[opposite].filter((id) => id !== userId);
        }
        video[voteType].push(userId);
        await video.updateOne({ yesVote: video.yesVote, noVote: video.noVote });
        return true;
      }

      function createVoteButtons(disabled = false) {
        return new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("yes")
            .setLabel("Good")
            .setEmoji("👍")
            .setStyle(ButtonStyle.Success)
            .setDisabled(disabled),
          new ButtonBuilder()
            .setCustomId("no")
            .setLabel("Bad")
            .setEmoji("👎")
            .setStyle(ButtonStyle.Danger)
            .setDisabled(disabled),
          new ButtonBuilder()
            .setCustomId("feedback")
            .setLabel("Give Feedback")
            .setEmoji("📝")
            .setStyle(ButtonStyle.Primary)
            .setDisabled(disabled)
        );
      }

      switch (customId) {
        case "yes":
          if (!(await handleVote(video, interaction.user.id, "yesVote"))) {
            return await interaction.reply({ content: "You already voted!" });
          }
          return await interaction.reply({ content: "You voted good!" });

        case "no":
          if (!(await handleVote(video, interaction.user.id, "noVote"))) {
            return await interaction.reply({ content: "You already voted!" });
          }
          return await interaction.reply({ content: "You voted bad!" });

        case "feedback":
          return await interaction.reply({
            content: "Button currently doesn't work",
          });

        case "nopost":
          return await button.update({
            content: "Video not posted",
            components: [createVoteButtons(true)],
          });

        case "post":
          const embed = new EmbedBuilder()
            .setColor(0x5fb041)
            .setTitle(video.title)
            .setDescription(
              "What did you think of it? Click the buttons below to vote"
            )
            .setThumbnail(video.thumbnail)
            .setAuthor({
              name: video.author,
              iconURL:
                "https://cdn.discordapp.com/avatars/890994028672319499/7750e3babbad5a777159c67668b3e649.webp",
              url: video.channelURL,
            })
            .setFooter({
              text: `Video poll posted by ${button.user.tag}`,
              iconURL: button.user.avatarURL(),
            });

          await button.update({
            content: "Video posted",
            components: [createVoteButtons(true)],
          });
          break;

        default:
          console.warn(`Unhandled button: ${customId}`);
      }
    }
  },
  color: "#ff0000",
};
