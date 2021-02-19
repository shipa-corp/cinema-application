const dbSettings = {
  db: process.env.DB, // "payment"
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  server: process.env.DB_SERVER,
};

const serverSettings = {
  port: process.env.PORT || 3000,
  ssl: require("./ssl"),
};

const stripeSettings = {
  secret: process.env.STRIPE_SECRET,
  public: process.env.STRIPE_PUBLIC,
};

module.exports = Object.assign(
  {},
  { dbSettings, serverSettings, stripeSettings }
);
