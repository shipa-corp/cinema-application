const dbSettings = {
  db: process.env.DB, // "cinemas",
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  server: process.env.DB_SERVER,
};

const serverSettings = {
  port: process.env.PORT || 3000,
  ssl: require("./ssl"),
};

module.exports = Object.assign({}, { dbSettings, serverSettings });
