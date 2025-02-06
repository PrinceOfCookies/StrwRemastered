const { get, post } = require("axios");

module.exports = async (client) => {
  client.http = async (url, method, headers, body) => {
    switch (method) {
      case "GET":
        try {
          let response = await get(url, { headers: headers });

          if (response.status < 200 || response.status >= 300) {
            console.error(
              "Failed to fetch data. Code:",
              response.status,
              "Reason:",
              response.statusText
            );
            return;
          }

          return response.data;
        } catch (error) {
          console.error("Error during GET request:", error);
        }
        break;
      case "POST":
        try {
          let response = await post(url, body, { headers: headers });

          if (response.status < 200 || response.status >= 300) {
            console.error(
              "Failed to post data. Code:",
              response.status,
              "Reason:",
              response.statusText
            );
            return;
          }

          return response.data;
        } catch (error) {
          console.error("Error during POST request:", error);
        }
        break;
      default:
        console.error("Invalid method");
        break;
    }
  };
};
