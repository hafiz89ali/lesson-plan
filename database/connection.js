import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "password",
  database: "eRPH",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  // ssl: true, enable this for production
});

// test connection function
async function db() {
  try {
    const databaseName = await pool.query("SELECT current_database()");
    const now = await pool.query("SELECT NOW()");
    const timeNow = now.rows[0].now;
    const dbName = databaseName.rows[0].current_database;
    console.log(`Connected to database: ${dbName} at ${timeNow}`);
  } catch (error) {
    console.log("Failed to connect to database.");
  }
}

db();

export default pool;
