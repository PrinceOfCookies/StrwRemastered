/**
 * Event handler for when the MongoDB database is connected.
 * @typedef {Object} ConnectedEvent
 * @property {string} name - The name of the event.
 * @property {Function} execute - The function to execute when the event is triggered.
 */
const chalk = require("chalk");

module.exports = {
  name: "connected",
  execute() {
    console.log(chalk.green("[Database Status]: Connected."));
  },
  color: chalk.greenBright,
};
