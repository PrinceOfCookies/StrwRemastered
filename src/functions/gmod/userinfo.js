module.exports = (client) => {
  client.userinfo = async (discordid, steamid) => {
    if ((await client.getSetting("riddlesServer")) == false) return false;

    let idToUse = discordid;
    let tag = "Not linked";
    let avatar = null;
    let globalname = "Not linked";
    let did = "Not linked";
    let linked = false;
    let steam32 = "Not linked";
    let steam64 = "Not linked";
    let profileurl = "Not linked";

    if (discordid && steamid) idToUse = discordid;
    if (steamid && !discordid) idToUse = steamid;
    if (!steamid && !discordid) return "No ID provided";

    if (idToUse == steamid && /^STEAM_[0-5]:[0-1]:\d+$/.test(idToUse)) {
      steam32 = idToUse;
      steam64 = await client.convert(steam32);
      steamid = steam64;
    } else if (idToUse == steamid && /^\d+$/.test(idToUse)) {
      steam64 = idToUse;
      steam32 = await client.convert(steam64);
    }

    try {
      console.time("Query Execution Time");
      const result = await client.query(
        `SELECT discordid, steamid FROM discord_codes WHERE discordid = ? OR steamid = ?`,
        [discordid, steamid]
      );
      console.timeEnd("Query Execution Time");
      const res = result[0] || [];

      // If steam32 exists but res.discordid doesnt, they are not linked
      if (res.steamid && res.discordid) {
        const user = await client.users.cache.get(res.discordid);

        linked = true;
        steam64 = res.steamid;
        steam32 = await client.convert(steam64);
        tag = user.tag || "Not linked";
        avatar = user.displayAvatarURL() || null;
        globalname = user.globalName || "Not linked";
        profileurl = `https://steamcommunity.com/profiles/${steam64}`;
        did = res.discordid;
      } else if (res.steamid && !res.discordid) {
        steam32 = res.steamid;
        steam64 = await client.convert(steam32);
        profileurl = `https://steamcommunity.com/profiles/${steam64}`;
      } else if (!res.steamid && res.discordid) {
        const user = await client.users.cache.get(res.discordid);
        tag = user.tag || "Not linked";
        avatar = user.displayAvatarURL() || null;
        globalname = user.globalName || "Not linked";
        did = res.discordid;
      } else if (!res.steamid && !res.discordid) {
        // Not claimed at all
        if (steam32) {
          // If its valid at this point this would mean steamid was used to search
          profileurl = `https://steamcommunity.com/profiles/${steam64}`;
        } else {
          const user = await client.users.cache.get(discordid);
          await new Promise((resolve) => setTimeout(resolve, 500));
          tag = user.tag || "Not linked";
          avatar = user.displayAvatarURL() || null;
          globalname = user.globalName || "Not linked";
          did = discordid;
        }
      }
    } catch (err) {
      console.error("Database error: ", err);
      return "An error occurred while fetching user info.";
    }

    return [tag, avatar, globalname, did, linked, steam32, steam64, profileurl];
  };
};
