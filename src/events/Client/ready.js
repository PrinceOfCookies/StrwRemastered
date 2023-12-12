/**
 * Represents an error event for the database connection.
 * @typedef {Object} ErrorEvent
 * @property {string} name - The name of the event.
 * @property {boolean} once - Whether the event should be executed only once.
 * @property {function} execute - The function that executes when the event is triggered.
 */


module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`${client.user.tag} is logged in`);

    // Get how many guilds the bot is in and their names
    const guilds = client.guilds.cache.map((guild) => guild.name);
    console.log(`Guilds: ${guilds.join(", ")}`);
    client.checkForums();
  },
  color: "lightGreen"
};
