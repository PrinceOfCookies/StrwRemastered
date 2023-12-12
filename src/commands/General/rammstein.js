const { SlashCommandBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reemrammstein")
    .setDescription("rammstein SONGS")
    .addSubcommand((subcommand) =>
      subcommand.setName("benzin").setDescription("Benzin")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("buckdich").setDescription("buckdich")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("dicketitten").setDescription("dicketitten")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("duhast").setDescription("duhast")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("duriechstsogut").setDescription("duriechstsogut")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("halleluja").setDescription("halleluja")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("hilfmir").setDescription("hilfmir")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("ichhassekinder").setDescription("ichhassekinder")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("ichtudirweh").setDescription("ichtudirweh")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("ladyboy").setDescription("ladyboy")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("mann").setDescription("mann")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("morgenstern").setDescription("morgenstern")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("ohnedich").setDescription("ohnedich")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("praiseabort").setDescription("praiseabort")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("puppe").setDescription("puppe")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("pussy").setDescription("Pussy")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("ramm4").setDescription("ramm4")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("sex").setDescription("sex")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("spielmitmir").setDescription("spielmitmir")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("steinumstein").setDescription("steinumstein")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("wolltihrdasbettinflammensehen")
        .setDescription("wolltihrdasbettinflammensehen")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("zwitter").setDescription("zwitter")
    ),
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case "benzin":
        await interaction.reply({
          content: "https://www.youtube.com/watch?v=z0wK6s-6cbo",
        });
        break;
      case "buckdich":
        await interaction.reply({
          content: "https://youtu.be/7T-CQTodzag",
        });
        break;
      case "dicketitten":
        await interaction.reply({
          content: "https://www.youtube.com/watch?v=thJgU9jkdU4",
        });
        break;
      case "duhast":
        await interaction.reply({
          content:
            "https://open.spotify.com/track/4xIbLpddk8s7uis3iAQT98?si=PZU7ZunyThSKSvK3o_5Y5w",
        });
        break;
      case "duriechstsogut":
        await interaction.reply({
          content:
            "https://open.spotify.com/track/4yUcHLkHUwAPpKN0Uvdo8I?si=94850ea77cc14680",
        });
        break;
      case "halleluja":
        await interaction.reply({
          content:
            "https://open.spotify.com/track/5lGk2d6vYXSv5RiLMHLsCZ?si=cced94e830b64a56",
        });
        break;
      case "hilfmir":
        await interaction.reply({
          content:
            "https://open.spotify.com/track/2STUa7rb27i7mCX7eOvr5K?si=f270c033beb7459d",
        });
        break;
      case "ichhassekinder":
        await interaction.reply({
          content:
            "https://open.spotify.com/track/0gzVVWrYrWkJJyZKE4K3pK?si=cf7ed6819b464200",
        });
        break;
      case "ichtudirweh":
        await interaction.reply({
          content:
            "https://open.spotify.com/track/7ritPWOWvsthxFDxOz1OjH?si=K6yMy8aoQtGNULkcHa-sPg",
        });

        break;
      case "ladyboy":
        await interaction.reply({
          content:
            "https://open.spotify.com/track/42DyyEfxbPexSiFVz4OnWH?si=DQed74XzRe6V-hLnrcEp0g",
        });
        break;
      case "mann":
        await interaction.reply({
          content:
            "https://open.spotify.com/track/0GxIAMtKFYTQZpR1avO6HB?si=170d4f53fcd74897",
        });
        break;
      case "morgenstern":
        await interaction.reply({
          content:
            "https://open.spotify.com/track/0gf9HMeZDXRexbuM5CihZg?si=Ri51-_TLQASMOqHp4IIVuw",
        });
        break;
      case "ohnedich":
        await interaction.reply({
          content:
            "https://open.spotify.com/track/4aFC7Mes7CW5vHcb8ZApAx?si=64452acb1a3543cf",
        });
        break;
      case "praiseabort":
        await interaction.reply({
          content:
            "https://open.spotify.com/track/1IHCEJ8tsYLYy7n65C0CVe?si=ee891e0bf19142d4",
        });

        break;
      case "puppe":
        await interaction.reply({
          content:
            "https://open.spotify.com/track/2iFgHPoa7FNHwgLnjXzu7F?si=9ddc7579ea124796",
        });
        break;
      case "pussy":
        await interaction.reply({
          content:
            "https://open.spotify.com/track/50AB24h51HlBrp6PqOg50k?si=27abd30f996b480c",
        });

        break;
      case "ramm4":
        await interaction.reply({
          content: "https://www.youtube.com/watch?v=MxFfS-X3Xoo",
        });
        break;
      case "sex":
        await interaction.reply({
          content:
            "https://open.spotify.com/track/15f16lrsDzFeNpHYBTzHLI?si=2e70a9903a8b45b5",
        });
        break;
      case "spielmitmir":
        await interaction.reply({
          content:
            "https://open.spotify.com/track/01jvnYLwnEwdnwGjsZq02E?si=8f98b9b619e94ef4",
        });
        break;
      case "steinnumstein":
        await interaction.reply({
          content:
            "https://open.spotify.com/track/20hfLWeQSJnJ2CiPxmjzsj?si=12b30314ee084b30",
        });

        break;
      case "wolltihrdasbettinflammensehen":
        await interaction.reply({
          content:
            "https://open.spotify.com/track/2MC5MLUdhrVUWGHUFHvaLF?si=1f622640ceff4d9e",
        });
        break;
      case "zwitter":
        await interaction.reply({
          content:
            "https://open.spotify.com/track/3Q70zeuBGJzhCOtzeBXoPS?si=MmP-TRjASiuP8UIbeZ4yTw",
        });
        break;
      default:
        break;
    }
  },
  cooldown: 5,
  color: chalk.hex("#C25811 "),
};
