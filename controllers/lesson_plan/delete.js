import database from "../../database/connection.js";

const query = `
DELETE FROM lesson_plan WHERE id = $1 AND created_by = $2
`;

async function deleteLessonPlan(req, res) {
  try {
    const lessonPlanId = req.params.id;
    const userId = req.user.id;
    const dbRes = await database.query(query, [todoId, userId]);
    if (dbRes.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found." });
    }
    const data = {
      message: `Successfully delete lesson plan with title '${lessonPlan.title}', on ${lessonPlan.date} ${lessonPlan.time}.`,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default deleteLessonPlan;
