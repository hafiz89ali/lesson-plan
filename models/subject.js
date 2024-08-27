import database from "../database/connection.js";

const createNewSubjectNameSQL = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_name varchar(255) UNIQUE,
    created_by uuid REFERENCES users(id),
    created_at timestamp DEFAULT NOW()
);
`;

async function createSubjectNameTable() {
  try {
    await database.query(createNewSubjectNameSQL);
    console.log("Subject Name table ready.");
  } catch (error) {
    return console.log("Error creating Subject Name table", error);
  }
}

export default createSubjectNameTable;
