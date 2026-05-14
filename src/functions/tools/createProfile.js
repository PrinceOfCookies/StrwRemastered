module.exports = (client) => {
  client.createProfile = async (userID, requestedSpecificPart) => {
    const existing = await client.query(
      "SELECT userid FROM users WHERE userID = ?",
      [userID]
    );
    if (existing.length > 0) {
      // If a specific part is requested, return only that part
      if (requestedSpecificPart) {
        return existing[0][requestedSpecificPart] || null;
      }
      return existing[0];
    };

    const insertResult = await client.query(
      `INSERT INTO users (
        userID, createdAt, botBanned, balance, hp, xp, level,
        inventory, kills, deaths, commandsRan, vidpollvotes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userID,
        Date.now(),
        false,
        25,
        100,
        0,
        0,
        JSON.stringify([]),
        JSON.stringify([]),
        JSON.stringify([]),
        JSON.stringify({}),
        JSON.stringify({}),
      ]
    );

    if (insertResult.affectedRows > 0) {
      const profile = await client.query(
        "SELECT * FROM users WHERE userID = ?",
        [userID]
      );
      // If a specific part is requested, return only that part
      if (requestedSpecificPart) {
        return profile[0][requestedSpecificPart] || null;
      }
      return profile[0];
    }
  };
};
