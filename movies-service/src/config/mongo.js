const MongoClient = require("mongodb");

const connect = (options, mediator) => {
  mediator.once("boot.ready", () => {
    const MONGO_URL = `mongodb://${options.user}:${options.pass}@${options.server}/${options.db}`;

    MongoClient.connect(MONGO_URL, (err, db) => {
      if (err) {
        mediator.emit("db.error", err);
      }

      console.log("URL:", MONGO_URL);

      if (db) {
        mediator.emit("db.ready", db);
      } else {
        mediator.emit("db.error", err);
      }
    });
  });
};

module.exports = Object.assign({}, { connect });
