module.exports = (client) => {
  client.getSetting = async (setting) => {
    let dbSetting = await client.query("SELECT * FROM settings WHERE setting = ?", [
      setting,
    ]);

    if (dbSetting.length > 0) {
      return Boolean(dbSetting[0].value);
    } else {
      return false;
    }
  };

  client.setSetting = async (setting, value) => {
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
  };
};
