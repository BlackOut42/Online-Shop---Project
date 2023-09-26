const expressSession = require("express-session");
const mongodbStore = require("connect-mongodb-session");

function createSessionStore() {
  const MongoDBStore = mongodbStore(expressSession);
  let MongoDbUrl = "mongodb://127.0.0.1:27017";
  if (process.env.MONGODB_URL) {
    MongoDbUrl = process.env.MONGODB_URL;
  }
  const store = new MongoDBStore({
    uri: MongoDbUrl,
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
