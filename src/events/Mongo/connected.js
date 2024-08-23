const chalk = require("chalk");

module.exports = {
  name: "connected",
  execute() {
    console.log(chalk.green("[Database Status]: Connected."));
  },
  color: chalk.greenBright,
};
