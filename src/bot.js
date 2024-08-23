require("dotenv").config();

const { TOKEN, MONGOTOKEN } = process.env;
const { connect, mongoose } = require("mongoose");
const {
  Client,
  Collection,
  GatewayIntentBits,
  ActivityType,
} = require("discord.js");
const { readdirSync } = require("fs");
mongoose.set("strictQuery", true);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.MessageContent,
  ],
  presence: {
    activities: [
      {
        name: "& Writing",
        type: ActivityType.Watching,
        state: "📝 logs",
        url: "https://strw.club/",
      },
    ],
    status: "online",
    afk: false,
    shardId: 0,
  },
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: true,
    roles: [],
    users: [],
  },
  ws: {
    properties: {
      $browser: "Discord Android",
      $device: "Discord Android",
      $os: "Android",
    },
  },
});

client.commands = new Collection();
client.cooldowns = new Collection();
client.buttons = new Collection();
client.commandArray = [];

const funcFolders = readdirSync("./src/functions");

for (const folder of funcFolders) {
  const funcFiles = readdirSync(`./src/functions/${folder}`).filter((file) =>
    file.endsWith(".js")
  );

  for (const file of funcFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

client.handleEvents().then(() => {
  client.handleCommands();
});

console.log(MONGOTOKEN);

connect(MONGOTOKEN).then(() => {
  client.login(TOKEN);
});
