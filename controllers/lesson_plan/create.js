import database from "../../database/connection.js";

const query = `
INSERT INTO lesson_plan (date, time, class_name, subject_name, title, activity, created_by)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING id, date, time, class_name, subject_name, title, activity, created_by, created_at;
`;

async function createLessonPlan(req, res) {
  try {
    // Req date, time, class_name, subject_name, title and activity from body
    const { date, time, class_name, subject_name, title, activity } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required." });
    }

    // req.user comes from the middleware isAuth
    const createdBy = req.user.id;
    const values = [
      date,
      time,
      class_name,
      subject_name,
      title,
      activity,
      createdBy,
    ];

    const dbRes = await database.query(query, values);
    const lesson_plan = dbRes.rows[0];
    const data = {
      message: "Lesson plan created successfully.",
      data: lesson_plan,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default createLessonPlan;
