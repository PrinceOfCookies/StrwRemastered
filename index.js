const { ActivityType, GatewayIntentBits } = require("discord.js");

module.exports = {
	enabled: true,
	envFile: ".env",
	tokenEnv: "TOKEN",

	paths: {
		functions: "src/functions",
		commands: "src/commands",
		events: "src/events"
	},

	clientOptions: {
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMessages,
			GatewayIntentBits.GuildMessageReactions,
			GatewayIntentBits.GuildMembers,
			GatewayIntentBits.GuildVoiceStates,
			GatewayIntentBits.GuildPresences,
			GatewayIntentBits.GuildInvites,
			GatewayIntentBits.MessageContent
		],

		presence: {
			activities: [
				{
					name: "& Writing",
					type: ActivityType.Watching
				}
			],
			status: "online",
			afk: false
		},

		allowedMentions: {
			parse: ["users", "roles"],
			repliedUser: true,
			roles: [],
			users: []
		}
	},

	tools: {
		mode: "extend"
	},

	functions: {
		mode: "extend",
		exclude: ["handleCommands.js"],

		manual: ["manageSettings.js"],
		lazy: ["serverConfig.js", "playerCountEmbed.js"]
	},

	events: {
		mode: "replace"
	},

	// Host handles command loading after functions are loaded.
	autoHandleCommands: true,

	// Host event loader loads src/events directly, so don't also run old handleEvents.
	autoHandleEvents: true,

	async afterLogin(client) {
		const manageSettingsPath = client.resolveBotPath(
			"src/functions/tools/manageSettings.js"
		);

		require(manageSettingsPath)(client);

		if (typeof client.setupWebSocket === "function") {
			await client.setupWebSocket();
		}
	}
};
