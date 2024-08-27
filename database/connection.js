import pg from "pg";
import createUsersTable from "../models/user.js";
import createClassNameTable from "../models/class.js";
import createSubjectNameTable from "../models/subject.js";
import createLessonPlanTable from "../models/lesson-plan.js";
const { Client } = pg;
import dotenv from "dotenv";

dotenv.config();

const database = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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
