const { red } = require("chalk");

module.exports = {
  name: "error",
  async execute(err) {
    console.log(red(`An error occured with the database connection:\n${err}`));
  },
  color: "#00FF00",
};
