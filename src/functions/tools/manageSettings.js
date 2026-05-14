module.exports = (client) => {
  client.getSetting = async (setting) => {
    try {
      let dbSetting = await client.query("SELECT * FROM settings WHERE setting = ?", [
        setting,
      ]);

      if (dbSetting.length > 0) {
        return Boolean(dbSetting[0].value);
      } else {
        return false;
      }
    } catch (error) {
      if (error?.code === "ER_NO_SUCH_TABLE") {
        return false;
      }

      console.error(`[${client.botName}] Failed to read setting "${setting}"`, error);
      return false;
    }
  };

  client.setSetting = async (setting, value) => {
    try {
      let dbSetting = await client.query("SELECT * FROM settings WHERE setting = ?", [
        setting,
      ]);

      if (dbSetting.length > 0) {
        const updatedSetting = await client.query(
          "UPDATE settings SET value = ? WHERE setting = ?",
          [value, setting]
        );
        if (updatedSetting.affectedRows > 0) {
          return client.getSetting(setting);
        }

        return false;
      }
    } catch (error) {
      if (error?.code === "ER_NO_SUCH_TABLE") {
        return false;
      }

      console.error(`[${client.botName}] Failed to write setting "${setting}"`, error);
    }
  };
};
