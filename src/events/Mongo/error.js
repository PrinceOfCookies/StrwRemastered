const chalk = require("chalk");
module.exports = {
  name: "err",
  /**
   * Executes the error handler.
   * @param {Error} err - The error object.
   */
  execute(err) {
    console.log(chalk.red(`An error occured with the database connection:\n${err}`));
  },
  color: chalk.red,
};
