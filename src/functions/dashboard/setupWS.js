const WebSocket = require("ws");

///////////////////////////////////////////////
//////////////////////INACTIVE/////////////////
///////////////////////////////////////////////

module.exports = (client) => {
  client.setupStatusWebSocket = async () => {
    const connect = () => {
      const ws = new WebSocket(process.env.DASH_WS_URL);
      client.wssConnection = ws;
      let heartbeatInterval = null;

      ws.on("open", () => {
        console.log("✅ Status WebSocket connected!");
        client.wssConnection = ws;

        heartbeatInterval = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send("ping");
          }
        }, 9000);
      });

      ws.on("message", (data) => {
        const message = data.toString();

        switch (message) {
          case "manageUser":
            // Info is sent with this, user ID, and punishment type
            let { userID, type, otherinfo } = JSON.parse(data);

            // Check if the user exists in the guild
            const member = client.guilds.cache.get(process.env.GUILD_ID)?.members.cache.get(userID);
            if (!member) {
              ws.send(`manageUserResponse:${JSON.stringify({ user: userID, type, success: false, error: "User not found in guild" })}`);
              return;
            }


            if (!member.manageable) {
              ws.send(`manageUserResponse:${JSON.stringify({ user: member.user.tag, type, success: false, error: "Cannot manage this user" })}`);
              return;
            }

            switch (type) {
              case "timeout":
                const duration = otherinfo.duration || 60000; // Default to 1 minute
                const reason = otherinfo.reason || "No reason provided";

                member.timeout(duration, reason).then(() => {
                  ws.send(`manageUserResponse:${JSON.stringify({ user: member.user.tag, type, success: true, duration, reason })}`);
                }).catch((err) => {
                  ws.send(`manageUserResponse:${JSON.stringify({ user: member.user.tag, type, success: false, error: err.message })}`);
                  console.error(`❌ Failed to timeout user ${member.user.tag}:`, err);
                });
                break;
              case "removeTimeout":
                if (member.communicationDisabledUntil && member.communicationDisabledUntil > new Date()) {
                  member.timeout(null, "Timeout removed via dashboard").then(() => {
                    ws.send(`manageUserResponse:${JSON.stringify({ user: member.user.tag, type, success: true })}`);
                  }).catch((err) => {
                    ws.send(`manageUserResponse:${JSON.stringify({ user: member.user.tag, type, success: false, error: err.message })}`);
                    console.error(`❌ Failed to remove timeout for user ${member.user.tag}:`, err);
                  });
                } else {
                    ws.send(`manageUserResponse:${JSON.stringify({ user: member.user.tag, type, success: false, error: "User is not currently timed out" })}`);
                }
                break;
              case "ban":
                const banReason = otherinfo.reason || "No reason provided";
                member.ban({ reason: banReason }).then(() => {
                    ws.send(`manageUserResponse:${JSON.stringify({ user: member.user.tag, type, success: true, reason: banReason })}`);
                }).catch((err) => {
                    ws.send(`manageUserResponse:${JSON.stringify({ user: member.user.tag, type, success: false, error: err.message })}`);
                    console.error(`❌ Failed to ban user ${member.user.tag}:`, err);
                });
                break;
              case "kick":
                const kickReason = otherinfo.reason || "No reason provided";
                member.kick(kickReason).then(() => {
                    ws.send(`manageUserResponse:${JSON.stringify({ user: member.user.tag, type, success: true, reason: kickReason })}`);
                }).catch((err) => {
                    ws.send(`manageUserResponse:${JSON.stringify({ user: member.user.tag, type, success: false, error: err.message })}`);
                    console.error(`❌ Failed to kick user ${member.user.tag}:`, err);
                });
                break;
              default:
                console.warn(`⚠️ Unknown user management type: ${type}`);
                break;
            }
            break;
          default:
            console.log("Received message from Status WS:", message);
            break;
        }
      });

      ws.on("close", () => {
        console.warn("⚠️ Status WebSocket disconnected. Reconnecting in 3s...");
        client.wssConnection = null;
        clearInterval(heartbeatInterval);
        setTimeout(connect, 3000);
      });

      ws.on("error", (err) => {
        console.error("❌ Status WebSocket error:", err.message);
        clearInterval(heartbeatInterval);
        ws.close();
      });
    };

    connect();
  };
};
