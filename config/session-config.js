const expressSession = require("express-session");
const mongodbStore = require("connect-mongodb-session");

function createSessionStore() {
  const MongoDBStore = mongodbStore(expressSession);

  const store = new MongoDBStore({
    uri: "mongodb://127.0.0.1:27017",
    databaseName: "online-shop",
    collection: "sessions",
  });
  return store;
}

function createSessionConfig() {
  return {
    secret: "grandpa and grandpa went on a super secret mission",
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //24 hrs
    },
  };
}

module.exports = createSessionConfig;

