module.exports = (client) => {
  client.query = (sql, params) => {
    return new Promise((resolve, reject) => {
      client.connection.query(sql, params, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };
};
