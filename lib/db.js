const pgp = require("pg-promise")();
const isProduction = process.env.NODE_ENV === "production";

const user = process.env.USERNAME;
const database = process.env.DATABASE_NAME;
const password = process.env.PASSWORD;
const port = process.env.DB_PORT;
const host = process.env.HOST;

// Use a symbol to store a global instance of a connection, and to access it from the singleton.
const DB_KEY = Symbol.for("MyApp.db");
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasDb = globalSymbols.indexOf(DB_KEY) > -1;

const connectionString = `postgres://${user}:${password}@${host}:${port}/${database}`;

if (!hasDb) {
	global[DB_KEY] = pgp({
		connectionString: isProduction
			? process.env.DATABASE_URL
			: connectionString,
		ssl: isProduction && { rejectUnauthorized: false },
	});
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
