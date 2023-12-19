const chalk = require("chalk");

module.exports = (client) => {
  client.color = async (hex, text) => {
    let hexColor = chalk.hex(hex);
    let colorText = hexColor(text);

    return colorText;
  };
};
