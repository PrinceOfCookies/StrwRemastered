# Strawhat Remastered (Bot)

- This is a remastered version of the old Strawhat bot, specifically designed for the [Strawhat Fanclub Discord server](https://strw.club). The bot has been updated and improved to provide a better experience for all members of the server. Enjoy enhanced features, improved performance, and new functionalities that make interacting with the server more fun and engaging.

# Improvements
- Condensed the rammstein songs to one command
- Created [`client.fastLog`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/fastLog.js) and [`client.createProfile`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/createProfile.js)
- General optimization of handlers
- Updated [Discord.JS](https://github.com/discordjs/discord.js) from v14.13 -> v14.15.3

### Definitions
- [`client.fastLog`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/fastLog.js) is a helper command, that just runs console.log on on text, with some pre put colored text. It takes both the text, and the color you want said text to be! it also takes a `start` parameter which should be `Date.now()` and then determines how long the task took
- [`client.createProfile`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/createProfile.js) does exactly what it says, it created a profile, whether this be when someone joins, does a command, types a message, whatever! It takes the user as a parameter, and checks if they already have a profile, if they do, it'll just return the profile! If they don't, then it will create a profile for them and then return that so it can be used!

# Suggestions/Improvements
- Feel free to explore the bot's source code and contribute to its development. If you have any suggestions for improvement, please submit a pull request

