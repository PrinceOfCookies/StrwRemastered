const { SlashCommandBuilder } = require("discord.js");
const chalk = require("chalk");

const songs = {
  benzin: "https://www.youtube.com/watch?v=z0wK6s-6cbo",
  buckdich: "https://youtu.be/7T-CQTodzag",
  dicketitten: "https://www.youtube.com/watch?v=thJgU9jkdU4",
  duhast:
    "https://open.spotify.com/track/4xIbLpddk8s7uis3iAQT98?si=PZU7ZunyThSKSvK3o_5Y5w",
  duriechstsogut:
    "https://open.spotify.com/track/4yUcHLkHUwAPpKN0Uvdo8I?si=94850ea77cc14680",
  halleluja:
    "https://open.spotify.com/track/5lGk2d6vYXSv5RiLMHLsCZ?si=cced94e830b64a56",
  hilfmir:
    "https://open.spotify.com/track/2STUa7rb27i7mCX7eOvr5K?si=f270c033beb7459d",
  ichhassekinder:
    "https://open.spotify.com/track/0gzVVWrYrWkJJyZKE4K3pK?si=cf7ed6819b464200",
  ichtudirweh:
    "https://open.spotify.com/track/7ritPWOWvsthxFDxOz1OjH?si=K6yMy8aoQtGNULkcHa-sPg",
  ladyboy:
    "https://open.spotify.com/track/42DyyEfxbPexSiFVz4OnWH?si=DQed74XzRe6V-hLnrcEp0g",
  mann: "https://open.spotify.com/track/0GxIAMtKFYTQZpR1avO6HB?si=170d4f53fcd74897",
  morgenstern:
    "https://open.spotify.com/track/0gf9HMeZDXRexbuM5CihZg?si=Ri51-_TLQASMOqHp4IIVuw",
  ohnedich:
    "https://open.spotify.com/track/4aFC7Mes7CW5vHcb8ZApAx?si=64452acb1a3543cf",
  praiseabort:
    "https://open.spotify.com/track/1IHCEJ8tsYLYy7n65C0CVe?si=ee891e0bf19142d4",
  puppe:
    "https://open.spotify.com/track/2iFgHPoa7FNHwgLnjXzu7F?si=9ddc7579ea124796",
  pussy:
    "https://open.spotify.com/track/50AB24h51HlBrp6PqOg50k?si=27abd30f996b480c",
  ramm4: "https://www.youtube.com/watch?v=MxFfS-X3Xoo",
  sex: "https://open.spotify.com/track/15f16lrsDzFeNpHYBTzHLI?si=2e70a9903a8b45b5",
  spielmitmir:
    "https://open.spotify.com/track/01jvnYLwnEwdnwGjsZq02E?si=8f98b9b619e94ef4",
  steinumstein:
    "https://open.spotify.com/track/20hfLWeQSJnJ2CiPxmjzsj?si=12b30314ee084b30",
  wolltihrdasbettinflammensehen:
    "https://open.spotify.com/track/2MC5MLUdhrVUWGHUFHvaLF?si=1f622640ceff4d9e",
  zwitter:
    "https://open.spotify.com/track/3Q70zeuBGJzhCOtzeBXoPS?si=MmP-TRjASiuP8UIbeZ4yTw",
};

const songSlashCommand = new SlashCommandBuilder()
  .setName("reemrammstein") // Reem is to seperate it from the other botban command (Old version, currently running)
  .setDescription("rammstein SONGS");

Object.keys(songs).forEach((songName) => {
  songSlashCommand.addSubcommand((subcommand) => {
    subcommand.setName(songName).setDescription(songName);
  });
});

module.exports = {
  data: songSlashCommand,
  async execute(interaction) {
    const requestedSong = interaction.options.getSubcommand();
    return await interaction.reply({
      content:
        songs[requestedSong] || `Unable to find song '${requestedSong}' :wawa:`,
    });
  },
  cooldown: 5,
  color: chalk.hex("#C25811"),
};
