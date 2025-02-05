# Strawhat Remastered (Bot)

- This is a remastered version of the old Strawhat bot, specifically designed for the [Strawhat Fanclub Discord server](https://strw.club). The bot has been updated and improved to provide a better experience for all members of the server. Enjoy enhanced features, improved performance, and new functionalities that make interacting with the server more fun and engaging.

## Improvements
## Improvements
- Condensed the Rammstein songs to one command.
- Created [`client.fastLog`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/fastLog.js) and [`client.createProfile`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/createProfile.js).
- General optimization of handlers.
- Updated [Discord.JS](https://github.com/discordjs/discord.js) from v14.16.1 to v14.17.3.
- Added [`wfm_login`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/wfm/wfm_login.js) to handle logging into the Warframe Market (WFM) using provided credentials, managing authentication and session.
- Added [`wfm_orderinfo`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/wfm/wfm_orderinfo.js) to retrieve information about orders from the Warframe Market, including order status, item details, and pricing.
- Added [`wfm_itemlist`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/wfm/wfm_itemlist.js) to fetch a list of items available on the Warframe Market, providing details such as item names, categories, and availability.


## Definitions
- [`client.fastLog`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/fastLog.js) is a helper command that runs `console.log` on text with pre-defined colored text. It takes the text, the color you want the text to be, and a `start` parameter (which should be `Date.now()`) to determine how long the task took.
- [`client.createProfile`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/createProfile.js) creates a profile when someone joins, executes a command, or types a message. It takes the user as a parameter, checks if they already have a profile, and returns it if they do. If they don't, it creates a profile for them and then returns it for use.
- [`wfm_login`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/wfm/wfm_login.js) logs into the Warframe Market (WFM) using provided credentials. It handles authentication and session management to ensure that the bot can interact with the WFM API.
- [`wfm_orderinfo`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/wfm/wfm_orderinfo.js) retrieves information about orders from the Warframe Market. It fetches details such as order status, item details, and pricing, allowing the bot to provide up-to-date market information.
- [`wfm_itemlist`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/wfm/wfm_itemlist.js) retrieves a list of items available on the Warframe Market. It fetches details such as item names, categories, and availability, allowing the bot to provide comprehensive item information.
- [`http`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/http.js) is a utility module for making HTTP requests. It provides functions to send GET, POST, and other types of requests to external APIs, handling responses and errors efficiently.


## Suggestions/Improvements
- Feel free to explore the bot's source code and contribute to its development. If you have any suggestions for improvement, please submit a pull request.
