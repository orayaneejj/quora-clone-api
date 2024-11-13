import { Router } from "express";
import pool from "../utils/db.mjs";
const answersRouter = Router();
//ผู้ใช้งานสามารถที่จะดูคำตอบของคำถามแต่ละอันได้
answersRouter.get("/:questionId/answers", async (req, res) => {
  try {
    const questionIdFromClient = req.params.questionId;
    const result = await pool.query(
      `select questions.id, answers.content as content
from answers 
inner join questions on questions.id = answers.question_id
where questions.id = $1;`,
      [questionIdFromClient]
    );
    if (!result.rows[0]) {
      return res.status(404).json({
        message: "Question not found.",
      });
    }
    return res.status(200).json({
      data: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch answers.",
      error: error.message,
    });
  }
});
export default answersRouter;
