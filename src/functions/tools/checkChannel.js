const Parser = require("rss-parser");
const parser = new Parser();

module.exports = async (client) => {
  client.checkChannel = async (channelID) => {
    console.log(
      `Checking channel: https://www.youtube.com/feeds/videos.xml?channel_id=${channelID}`
    );
    const data = await parser
      .parseURL(
        `https://www.youtube.com/feeds/videos.xml?channel_id=${channelID}`
      )
      .catch((err) => console.error(err));

    if (!data) {
      console.log(`Data: ${data}`);
      return false;
    }

    // console.log(data)
    let { title, link, id, author } = data.items[0];

    let video = await client.query("SELECT ID FROM videos WHERE ID = ?", [id]);
    if (video.length > 0) {
      console.log(`Video already exists in database: ${id}`);
      return false;
    }

    if (!video) {
      console.log(`Video doesnt exist in database. Adding: ${id}`);

      const newVideo = await client.query(
        "INSERT INTO videos (ID, channelID, title, author, link, thumbnail, channelURL, used, noVote, yesVote) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          id,
          channelID,
          title,
          author,
          link,
          `https://img.youtube.com/vi/${id.slice(9)}/maxresdefault.jpg`,
          `https://www.youtube.com/channel/${channelID}`,
          false,
          JSON.stringify([]),
          JSON.stringify([]),
        ]
      );

      if (newVideo.affectedRows > 0) {
        const newVideoData = await client.query(
          "SELECT ID FROM videos WHERE ID = ?",
          [id]
        );
        return newVideoData[0].ID;
      } else {
        return false;
      } 
    } else {
      return false;
    }
  };
};
