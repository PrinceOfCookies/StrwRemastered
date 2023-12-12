/**
 * Represents an error event for the database connection.
 * @typedef {Object} ErrorEvent
 * @property {string} name - The name of the event.
 * @property {function} execute - The function that executes when the event is triggered.
 */

const chalk = require("chalk");

module.exports = {
  name: "disconnected",
  execute() {
    console.log(chalk.red("[Database Status]: Disconnected."));
  },
  color: chalk.red
};
