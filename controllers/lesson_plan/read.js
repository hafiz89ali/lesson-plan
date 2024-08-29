import database from "../../database/connection.js";

const query = `
SELECT * FROM todos WHERE id = $1 AND created_by = $2;
`;

async function readLessonPlan(req, res) {
  try {
    const lessonPlanId = req.params.id;
    const userId = req.user.id;
    const dbRes = await database.query(query, [lessonPlanId, userId]);
    const lessonPlan = dbRes.row[0];

    if (!lessonPlan) {
      return res.status(404).json({ error: "Todo not found." });
    }
    const data = {
      message: `Lesson plan id ${lessonPlanId} successfully.`,
      data: lessonPlan,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default readLessonPlan;
