# Strawhat Remastered (Bot)

- This is a remastered version of the old Strawhat bot, specifically designed for the [Strawhat Fanclub Discord server](https://strw.club). The bot has been updated and improved to provide a better experience for all members of the server. Enjoy enhanced features, improved performance, and new functionalities that make interacting with the server more fun and engaging.

### Tools
- [`client.checkChannel`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/checkChannel.js): Checks a youtube channel by their ID to get their most recent upload, and insert the data into the database.
- [`client.color`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/colors.js): Simple helper function for coloring text.
- [`client.hexToRGB`](https://github.com/PrinceOfcookies/StrwRemastered/blob/master/src/functions/tools/colors.js): Another simple function to convert Hex to RGB.
- [`client.createProfile`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/createProfile.js): Manages user profiles by checking if a profile exists for a user. If it does, it returns the profile; otherwise, it creates a new profile and returns it.
- [`client.fastLog`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/fastLog.js): A helper function that runs `console.log` with pre-defined colored text. It takes three parameters: the text to log, the desired color, and a `start` timestamp (e.g., `Date.now()`) to calculate task duration.
- [`client.http`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/http.js): Unused function as I'm trying to move away from using axios and rely only on fetch.
- [`client.incrementCommandRun`](https://github.com/PrinceOfCookies/blob/master/src/functions/tools/incrementCommandRun.js): This function runs a query increment a number in the database and update the amount of times a command has been ran.
- [`client.getSetting`](https://github.com/PrinceOfCookies/blob/master/src/functions/tools/manageSettings.js): This function is used to.. well do exactly what the function says, it gets the setting thats requested.
- [`client.setSetting`](https://github.com/PrinceOfCookies/blob/master/src/functions/tools/manageSettings.js): Once again, does what the function name says, sets the setting to the requested thing. (Settings is currently a work in progress feature)
- [`client.query`](https://github.com/PrinceOfCookies/blob/master/src/functions/tools/query.js): This function is used to query the database in a promise.

### Warframe Market (WFM) Functions
- [`wfm_login`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/wfm/wfm_login.js): Logs into the Warframe Market using provided credentials. It manages authentication and session handling to enable interaction with the WFM API.
- [`wfm_orderinfo`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/wfm/wfm_orderinfo.js): Retrieves information about orders from the Warframe Market, including order status, item details, and pricing.
- [`wfm_itemlist`](https://github.com/PrinceOfCookies/StrwRemastered/blob/master/src/functions/tools/wfm/wfm_itemlist.js): Fetches a list of items available on the Warframe Market, providing details such as item names, categories, and availability.

---


## Suggestions/Improvements
- Feel free to explore the bot's source code and contribute to its development. If you have any suggestions for improvement, please submit a pull request.
