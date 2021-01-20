const pgp = require("pg-promise")();

const user = process.env.USERNAME;
const database = process.env.DATABASE_NAME;
const password = process.env.PASSWORD;
const port = process.env.DB_PORT;
const host = process.env.HOST;

// Use a symbol to store a global instance of a connection, and to access it from the singleton.
const DB_KEY = Symbol.for("MyApp.db");
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasDb = globalSymbols.indexOf(DB_KEY) > -1;
if (!hasDb) {
  global[DB_KEY] = pgp(
    `postgres://${user}:${password}@${host}:${port}/${database}`
  );
}

// Create and freeze the singleton object so that it has an instance property.
const singleton = {};
Object.defineProperty(singleton, "instance", {
  get: function () {
    return global[DB_KEY];
  },
});
Object.freeze(singleton);

module.exports = singleton;
