const { convertTo64, converToText } = require("steamidconvert");

module.exports = (client) => {
  client.convert = async (steamid) => {
    // This can be used even if we are not using the riddlesServer
    if (/^STEAM_[0-5]:[0-1]:\d+$/.test(steamid)) {
      return convertTo64(steamid);
    }

    return converToText(steamid);
  };
};
