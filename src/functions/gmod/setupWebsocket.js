const WebSocket = require("ws");

module.exports = (client) => {
  client.setupWebSocket = async () => {
    if ((await client.getSetting("riddlesServer")) == false) return false;

    const connect = () => {
      const ws = new WebSocket(process.env.WS_URL);
      client.wsConnection = ws;
      let lastMessageTime = 0;

      ws.on("open", () => {
        console.log("✅ WebSocket connected!");
        client.wsConnection = ws;
      });

      ws.on("message", (msg) => {
        try {
          const message = JSON.parse(msg);
          switch (message.type) {
            case "newMessage":
              if (message.payload) {
                console.log("New message:", message.payload);
                // Split message.payload by the comma
                const [text, number, name] = message.payload.split(",");
                if (!text || !number || !name) return;

                if (number == lastMessageTime && number != 0) return;
                if (number != 0) lastMessageTime = number;

                const channel = client.channels.cache.get(
                  "1364361067697803426"
                );
                if (!channel || !channel.isTextBased?.()) return;

                let format = `**${name}**: ${text}`;

                if (number == 0) {
                  format = `**${name}** ${text}`;
                }

                channel.send({
                  content: format,
                  allowedMentions: {
                    parse: ["users"],
                    repliedUser: false,
                  },
                });
              }
              break;
            case "rPing":
              let ping = message.payload;

              // get the channel topic of 1364361067697803426
              const channel = client.channels.cache.get("1364361067697803426");
              if (!channel || !channel.isTextBased?.()) return;
              let topic = channel.topic || "No topic set";
              if (topic == ping) return;
              if (ping == "Offline") ping = "Offline/Unreachable";
              channel.setTopic("Server status: " + ping);
              break;
          }
        } catch (err) {
          console.error("❗ Error processing WebSocket message:", err);
        }
      });

      ws.on("close", () => {
        console.warn("⚠️ WebSocket disconnected. Reconnecting in 3s...");
        client.wsConnection = null;
        setTimeout(connect, 3000); // Reconnect after 3 seconds
      });

      ws.on("error", (err) => {
        console.error("❌ WebSocket error:", err.message);
        ws.close(); // Force reconnect
      });
    };

    connect();
  };
};
