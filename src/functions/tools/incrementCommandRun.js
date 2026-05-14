module.exports = (client) => {
  client.incrementCommandRun = async (userId, commandName) => {
    await client.query(
      `UPDATE users SET commandsRan = JSON_SET(
       commandsRan,
       '$.${commandName}',
       COALESCE(JSON_EXTRACT(commandsRan, '$.${commandName}'), 0) + 1
     ) WHERE userId = ?`,
      [userId]
    );
  };
};
