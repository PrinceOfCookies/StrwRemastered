const Parser = require("rss-parser");
const parser = new Parser();

module.exports = async (client) => {
  client.checkChannel = async (channelID) => {
    console.log(
      `Checking channel: https://www.youtube.com/feeds/videos.xml?channel_id=${channelID}`
    );

    let data;
    try {
      data = await parser.parseURL(
        `https://www.youtube.com/feeds/videos.xml?channel_id=${channelID}`
      );
    } catch (err) {
      console.error("Failed to parse feed:", err);
      return false;
    }

    if (!data || !data.items || data.items.length === 0) {
      console.log("No videos found in feed.");
      return false;
    }

    const firstItem = data.items[0];
    const { title, link, id: fullId, author } = firstItem;

    console.log(firstItem)
    const videoId = fullId.replace("yt:video:", "");

    console.log(`Video ID: ${videoId}`);
    console.log(`Video Title: ${title}`);
    console.log(`Video Link: ${link}`);
    console.log(`Video Author: ${author || "Unknown"}`);

    const existing = await client.query("SELECT ID FROM videos WHERE ID = ?", [
      fullId,
    ]);

    if (existing.length > 0) {
      console.log(`Video already exists in database: ${fullId}`);
      return false;
    }

    console.log(`Video doesn't exist in database. Adding: ${fullId}`);

    const insert = await client.query(
      "INSERT INTO videos (ID, channelID, title, author, link, thumbnail, channelURL, used, noVote, yesVote) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        fullId,
        channelID,
        title,
        author || "Unknown",
        link,
        `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        `https://www.youtube.com/channel/${channelID}`,
        false,
        JSON.stringify([]),
        JSON.stringify([]),
      ]
    )

    if (insert.affectedRows > 0) {
      const newRow = await client.query("SELECT ID, author FROM videos WHERE ID = ?", [
        fullId,
      ]);
      return [newRow[0]?.ID || false, newRow[0]?.author || "Unknown"];
    }

    return false;
  };
};
