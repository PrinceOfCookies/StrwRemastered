const axios = require("axios");
const forums = require(`../../schemas/forums`);
const { FFAPIL } = process.env;
const { red } = require("chalk");

const getTime = () => {
  let date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let time = `${hour}:${minutes}`;
  let fullDate = `${month}/${day}/${date.getFullYear()} ${time}`;
  return fullDate;
};

module.exports = async (client) => {
  client.checkForums = async () => {
    let date = await getTime();
    console.log(`[${date}] Checking forums...`);
    const data = await axios.get(FFAPIL).catch((er) => console.error(red(er)));

    if (!data) {
      console.error(red(`[${date}] No data found.`));
      return false;
    }

    console.log(`[${date}] Data found.`);
    // Convert the data from JSON
    const forumsData = Object.values(data.data);
    const keys = Object.keys(data.data);

    let Forums = {}

    // Make the keys the keys for the forums
    keys.forEach(async (key) => {
        Forums[key] = []
        forumsData.forEach(async (forum) => {
            Forums[key].push(forum)
        });
    });

    // Make the data the values for the forums
    

    // Loop through the data
    let i = 0;
    keys.forEach(async (key) => {
      console.log(`[${date}] Checking ${key}...`);
      forumsData.forEach(async (forum) => {
        console.log(`[${date}] ${forum[0][5]}`);
      });
    });
  };
};
