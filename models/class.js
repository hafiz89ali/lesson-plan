import database from "../database/connection.js";

const createNewClassNameSQL = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS class (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_name varchar(255) UNIQUE,
    created_by uuid REFERENCES users(id),
    created_at timestamp DEFAULT NOW()
);
`;

async function createClassNameTable() {
  try {
    await database.query(createNewClassNameSQL);
    console.log("Class Name table ready.");
  } catch (error) {
    return console.log("Error creating Class Name table", error);
  }
}

export default createClassNameTable;
