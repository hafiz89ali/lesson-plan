import pg from "pg";
import createUsersTable from "../models/user.js";
import createClassNameTable from "../models/class.js";
import createSubjectNameTable from "../models/subject.js";
import createLessonPlanTable from "../models/lesson-plan.js";
const { Client } = pg;

const database = new Client({
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
async function testConnectionAndLog() {
  try {
    await database.connect();
    const queryTime = await database.query("SELECT NOW()");
    const databaseName = await database.query("SELECT current_database()");
    const currentTime = queryTime.rows[0].now;
    const currentDatabase = databaseName.rows[0].current_database;
    console.log(`Connected to database: ${currentDatabase} at ${currentTime}`);
    await createUsersTable();
    await createClassNameTable();
    await createSubjectNameTable();
    await createLessonPlanTable();
  } catch (err) {
    console.log("Failed to connect to database.", err);
  }
}

testConnectionAndLog();

export default database;
