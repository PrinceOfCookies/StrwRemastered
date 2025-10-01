module.exports = {
  name: "clientReady",
  async execute() {
    setInterval(async () => {
      try {
        await fetch("https://princeofcookies.com/api/v1/bot/server-status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.BOT_TOKEN}`
          },
          body: JSON.stringify({ status: 'online', timestamp: new Date().toISOString() })
        });
      } catch (error) {
        console.error("Error sending server status:", error);
      }
    }, 60000);
  },
  color: "#424de9ff",
};
