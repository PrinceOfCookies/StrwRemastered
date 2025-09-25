require("dotenv").config();

const { TOKEN, SQL_HOST, SQL_USER, SQL_PASSWORD, SQL_PORT, SQL_DATABASE } =
  process.env;
const mysql = require("mysql");
const chalk = require("chalk");

const {
  Client,
  Collection,
  GatewayIntentBits,
  ActivityType,
} = require("discord.js");
const { readdirSync } = require("fs");

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

const loadOrder = ["tools", "dashboard", "gmod", "wfm", "handlers"]; // Define the desired load order

for (const folder of loadOrder) {
  if (funcFolders.includes(folder)) {
    // If the file is manageSettings.js, skip it
    const funcFiles = readdirSync(`./src/functions/${folder}`).filter((file) =>
      file.endsWith(".js")
    );

    for (const file of funcFiles) {
      if (file === "manageSettings.js") continue;
      // console.log(`Loading function: ${folder}/${file}`);
      require(`./functions/${folder}/${file}`)(client);
    }
  }
}

client.handleCommands().then(async () => {
  await client.handleEvents();

  await client.wfmlogin();
  await client.getWFMItems();
});

client.login(TOKEN).then(async () => {
  client.connection = mysql.createConnection({
    host: SQL_HOST,
    user: SQL_USER,
    password: SQL_PASSWORD,
    port: SQL_PORT,
    database: SQL_DATABASE,
  });

  client.connection.connect((err) => {
    if (err) {
      console.error(chalk.red("Error connecting to the database: " + err));
      return;
    }
    console.log(chalk.green("Connected to the database!"));
  });

  require(`./functions/tools/manageSettings.js`)(client);
  console.log(chalk.green("Loaded manageSettings.js"));

  await client.setupWebSocket();
  await client.setupStatusWebSocket();
});
