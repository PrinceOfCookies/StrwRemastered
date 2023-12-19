/**
 * Represents an error event for the database connection.
 * @typedef {Object} ErrorEvent
 * @property {string} name - The name of the event.
 * @property {function} execute - The function that executes when the event is triggered.
 */

const User = require("../../schemas/users.js");
const mongoose = require("mongoose");
const chalk = require("chalk");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName, user } = interaction;
      const command = commands.get(commandName);
      let Profile = await User.findOne({ userID: user.id });

      if (!Profile) { 
        Profile = new User({
          _id: mongoose.Types.ObjectId(),
          userID: user.id,
          createdAt: Date.now(),
          botBanned: false,
          balance: 25,
          hp: 100,
          xp: 0,
          level: 0,
          inventory: [],
          kills: [],
          deaths: [],
          commandsRan: {},
          vidpollvotes: {},
        });
        await Profile.save().catch((err) => console.log(err));
      }

      if (!command) return;
      if (Profile.botBanned) return;

      try {
        // Check if the command is on cooldown for that guild
        if (command.cooldown) {
          if (client.cooldowns.has(`${user.id}-${command.name}`)) {
            const timeLeft = client.cooldowns.get(`${user.id}-${command.name}`);
            let timeleft = timeLeft * 0.001 - Math.floor(Date.now() * 0.001);

            return await interaction.reply({
              content: `You are on cooldown for this command! Please wait ${Math.floor(
                timeleft
              )} more second(s) before using this command again!`,
              ephemeral: true,
            });
          }
        }

        if (command.allowRoles) {
          if (
            !command.allowRoles.some((role) =>
              interaction.member.roles.cache.has(role)
            )
          ) {
            return await interaction.reply({
              content: `You don't have the required role to use this command!`,
              ephemeral: true,
            });
          }
        }

        await command.execute(interaction, client);
        // Add the command to the user's commands ran
        Profile.updateOne({
          $inc: { [`commandsRan.${command.name}`]: 1 },
        });

        // Put the guild on cooldown
        if (command.cooldown) {
          const cd = command.cooldown * 1000;
          client.cooldowns.set(`${user.id}-${command.name}`, Date.now() + cd);
          setTimeout(() => {
            client.cooldowns.delete(`${user.id}-${command.name}`);
          }, cd);
        }
      } catch (error) {
        console.log(error);
        await interaction.reply({
          content: `Something went wrong while executing this command!`,
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error("There is no code for this button");

      switch (customId) {
        case "yes":
          // Check if the user has already voted
          if (video.yesVote.includes(nbutton.user.id)) {
            return await videoschannel.send({
              content: "You have already voted!",
              ephemeral: true,
            });
          } else if (video.noVote.includes(nbutton.user.id)) {
            await videoschannel.send({
              content: "You've changed your vote to good!",
              ephemeral: true,
            });

            // Remove the user from the noVote array
            await video.updateOne({
              noVote: video.noVote.filter((id) => id !== nbutton.user.id),
            });
            // Add the user to the yesVote array
            await video.updateOne({
              yesVote: video.yesVote.push(nbutton.user.id),
            });
          }

          await videoschannel.send({
            content: "You voted good!",
            ephemeral: true,
          });

          break;
        case "no":
          // Check if the user has already voted
          if (video.noVote.includes(nbutton.user.id)) {
            return await videoschannel.send({
              content: "You have already voted!",
              ephemeral: true,
            });
          } else if (video.yesVote.includes(nbutton.user.id)) {
            await videoschannel.send({
              content: "You've changed your vote to bad!",
              ephemeral: true,
            });

            // Remove the user from the yesVote array
            await video.updateOne({
              yesVote: video.yesVote.filter((id) => id !== nbutton.user.id),
            });
            // Add the user to the noVote array
            await video.updateOne({
              noVote: video.noVote.push(nbutton.user.id),
            });
          }
          await videoschannel.send({
            content: "You voted bad!",
            ephemeral: true,
          });

          break;
        case "feedback":
          await videoschannel.send({
            content: "Button currently doesnt work",
            ephemeral: true,
          });
          break;
        case "nopost":
          await button.update({
            content: "Video not posted",
            components: [disabledPostButton],
          });
        case "post":
          let embed = new EmbedBuilder()
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
              text: "Video poll posted by " + button.user.tag,
              iconURL: button.user.avatarURL(),
            });

          let voteButtons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("yes")
              .setLabel("Good")
              .setEmoji("👍")
              .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
              .setCustomId("no")
              .setLabel("Bad")
              .setEmoji("👎")
              .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()
              .setCustomId("feedback")
              .setLabel("Give Feedback")
              .setEmoji("📝")
              .setStyle(ButtonStyle.Primary)
          );

          let disabledPostButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("post")
              .setLabel("Post Video Poll")
              .setEmoji("✔")
              .setStyle(ButtonStyle.Success)
              .setDisabled(true),

            new ButtonBuilder()
              .setCustomId("nopost")
              .setLabel("No Video Poll")
              .setEmoji("❌")
              .setStyle(ButtonStyle.Danger)
              .setDisabled(true),

            new ButtonBuilder()
              .setCustomId("feedback")
              .setLabel("Give Feedback")
              .setEmoji("📝")
              .setStyle(ButtonStyle.Primary)
              .setDisabled(true)
          );

          await button.update({
            content: "Video posted",
            components: [disabledPostButton],
          });
      }
    }
  },
  color: chalk.redBright,
};
