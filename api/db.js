const Pool = require("pg").Pool;
const password = "2523";
const PORT = "5432";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "itinerary_db",
  password: password,
  port: PORT,
});

module.exports = pool;
