import database from "../database/connection.js";

const createNewLessonPlanSQL = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS lesson_plan (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    time TIME NOT NULL,
    class_name varchar(255),
    subject_name varchar(255),
    title varchar(255),
    activity text,
    created_by uuid REFERENCES users(id),
    created_at timestamp DEFAULT NOW()
);
`;

async function createLessonPlanTable() {
  try {
    await database.query(createNewLessonPlanSQL);
    console.log("Lesson Plan table ready.");
  } catch (error) {
    return console.log("Error creating Lesson Plan table", error);
  }
}

export default createLessonPlanTable;
