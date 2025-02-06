const { hex } = require("chalk");

module.exports = (client) => {
  client.color = async (hexC, text) => {
    let hexColor = hex(hexC);
    let colorText = hexColor(text);

    return colorText;
  };
};
