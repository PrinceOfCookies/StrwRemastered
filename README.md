# Strawhat Remastered (Bot)

- This is a remastered version of the old Strawhat bot, specifically designed for the [Strawhat Fanclub Discord server](https://strw.club). The bot has been updated and improved to provide a better experience for all members of the server. Enjoy enhanced features, improved performance, and new functionalities that make interacting with the server more fun and engaging.

## Improvements
- Combined Rammstein songs into a single command.
- Added [`client.fastLog`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/fastLog.js) and [`client.createProfile`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/createProfile.js).
- Optimized handlers and updated [Discord.JS](https://github.com/discordjs/discord.js) to v14.19.2
- Introduced Warframe Market (WFM) functions: [`wfm_login`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/wfm/wfm_login.js), [`wfm_orderinfo`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/wfm/wfm_orderinfo.js), and [`wfm_itemlist`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/wfm/wfm_itemlist.js).
- Transitioned the database system from MongoDB to MySQL to better align with project requirements and improve data handling capabilities.
- Cleaned up the project by removing several unnecessary packages, reducing dependencies and improving maintainability.

### Tools
- [`client.fastLog`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/fastLog.js): A helper function that runs `console.log` with pre-defined colored text. It takes three parameters: the text to log, the desired color, and a `start` timestamp (e.g., `Date.now()`) to calculate task duration.
- [`client.createProfile`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/createProfile.js): Manages user profiles by checking if a profile exists for a user. If it does, it returns the profile; otherwise, it creates a new profile and returns it.
- [`http`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/http.js): A utility module for making HTTP requests. It supports GET, POST, and other request types, handling responses and errors efficiently.

### Warframe Market (WFM) Functions
- [`wfm_login`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/wfm/wfm_login.js): Logs into the Warframe Market using provided credentials. It manages authentication and session handling to enable interaction with the WFM API.
- [`wfm_orderinfo`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/wfm/wfm_orderinfo.js): Retrieves information about orders from the Warframe Market, including order status, item details, and pricing.
- [`wfm_itemlist`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/wfm/wfm_itemlist.js): Fetches a list of items available on the Warframe Market, providing details such as item names, categories, and availability.

---


## Suggestions/Improvements
- Feel free to explore the bot's source code and contribute to its development. If you have any suggestions for improvement, please submit a pull request.
