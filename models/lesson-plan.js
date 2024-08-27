import database from "../database/connection.js";

const createNewLessonPlanSQL = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    time TIME NOT NULL,
    class_name uuid REFERENCES class_name(id),
    subject_name uuid REFERENCES subject_name(id),
    username varchar(255) UNIQUE,
    email varchar(255) UNIQUE,
    password varchar(255),
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
