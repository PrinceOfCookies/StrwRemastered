# StrwRemastered

StrwRemastered is the Strawhat Discord bot that runs under the MasterBot host.

## Runtime

- Bot config lives in `bots/strwremastered/index.js`
- Bot env lives in `bots/strwremastered/.env`
- Commands live in `bots/strwremastered/src/commands`
- Bot events live in `bots/strwremastered/src/events`
- Bot-specific tools live in `bots/strwremastered/src/functions/tools`

## Shared host pieces

- `client.handleCommands` comes from MasterBot and loads slash commands from the bot command root
- `client.query` comes from MasterBot and wraps the bot's database connection
- Shared slash command registration uses `CLIENT_ID` and `TOKEN` from bot env first, then bot config

## Common tools

- `client.checkChannel` checks a YouTube channel and stores the latest upload
- `client.createProfile` creates or fetches a user profile
- `client.fastLog` prints short timing logs
- `client.getSetting` and `client.setSetting` read and write bot settings
- `client.http` is a fetch helper
- `client.incrementCommandRun` updates command usage counts

## Warframe Market tools

- `wfm_login`
- `wfm_orderinfo`
- `wfm_itemlist`

## Notes

- Command loading is host-owned now, so StrwRemastered only needs to point at its own command folder.
- Keep bot-specific code in the bot folder unless it is intended to be shared by every bot.
