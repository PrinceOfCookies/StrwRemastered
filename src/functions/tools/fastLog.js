const chalk = require("chalk");

module.exports = (client) => {
  client.fastLog = async (messageText, color, start) => {
    const time = Date.now() - start;
    const color = "#b3b3b3";

    let first = await client.color(color, "[");
    let message = chalk.green(messageText);
    let second = await client.color(color, "] ");
    let name = await client.color(color, name);
    let third = await client.color(color, " loaded in");
    let fourth = chalk.yellow(`${time}ms`);

    const logMessage = first + message + second + third + fourth;
    return console.log(logMessage);
  };
};
