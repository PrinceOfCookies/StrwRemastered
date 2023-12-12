const Parser = require("rss-parser");
const parser = new Parser();
const vids = require("../../schemas/videos");
const mongoose = require("mongoose");

module.exports = async (client) => {
  client.checkChannel = async (channelID) => {
    console.log(`Checking channel: https://www.youtube.com/feeds/videos.xml?channel_id=${channelID}`)
    const data = await parser.parseURL(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelID}`
    ).catch((err) => console.error(err));

    if (!data) {
      console.log(`Data: ${data}`) 
      return false
    }

    // console.log(data)
    let { title, link, id, author } = data.items[0];

    let video = await vids.findOne({ ID: id });

    if (!video) {
      console.log(`Video doesnt exist in database. Adding: ${id}`)
      const newVideo = new vids({
        _id: mongoose.Types.ObjectId(),
        channelID: channelID,
        ID: id,
        title: title,
        author: author,
        link: link,
        thumbnail: `https://img.youtube.com/vi/${id.slice(9)}/maxresdefault.jpg`,
        channelURL: `https://www.youtube.com/channel/${channelID}`,
        used: false,
        noVote: [],
        yesVote: [],
      });

      await newVideo.save().catch((err) => console.error(err));
      return newVideo.ID
    } else {
        return false;
    }
  };
};
