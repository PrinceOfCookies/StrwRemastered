/**
 * Represents an error event for the database connection.
 * @typedef {Object} ErrorEvent
 * @property {string} name - The name of the event.
 * @property {function} execute - The function that executes when the event is triggered.
 */

const chalk = require("chalk");
module.exports = {
  name: "err",
  execute(err) {
    console.log(chalk.red(`An error occured with the database connection:\n${err}`));
  },
  color: chalk.red,
};
