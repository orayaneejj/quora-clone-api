import { Router } from "express";
import pool from "../utils/db.mjs";
const questionsRouter = Router();
import { validateQuestionData } from "../middlewares/question.validation.mjs";
// ดูคำถามทั้งหมด
questionsRouter.get("/", async (req, res) => {
  try {
    const results = await pool.query(`select * from questions`);
    return res.status(200).json({
      data: results.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch questions.",
      error: error.message,
    });
  }
});

//ดูคำถามจาก id
questionsRouter.get("/:questionId", async (req, res) => {
  try {
    const questionIdFromClient = req.params.questionId;
    const result = await pool.query(`select * from questions where id = $1`, [
      questionIdFromClient,
    ]);
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
      message: "Unable to fetch questions.",
      error: error.message,
    });
  }
});

//สร้างคำถาม
questionsRouter.post("/", validateQuestionData, async (req, res) => {
  const newQuestion = {
    ...req.body,
  };
  try {
    await pool.query(
      `insert into questions (title, description, category)
             values ($1, $2, $3)`,
      [newQuestion.title, newQuestion.description, newQuestion.category]
    );

    return res.status(201).json({
      message: "Question created successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create question.",
      error: error.message,
    });
  }
});
//แก้ไขคำถาม จาก id
questionsRouter.put("/:questionId", validateQuestionData, async (req, res) => {
  try {
    const questionIdFromClient = req.params.questionId;
    const updatedQuestion = { ...req.body };
    const result = await pool.query(
      `
          update questions set
            title = $2,
            description = $3,
            category = $4
            where id = $1
          `,
      [
        questionIdFromClient,
        updatedQuestion.title,
        updatedQuestion.description,
        updatedQuestion.category,
      ]
    );
    if (!result.rowCount) {
      return res.status(404).json({
        message: "Question not found.",
      });
    }
    return res.status(200).json({ message: "Question updated successfully." });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch questions.",
      error: error.message,
    });
  }
});
//ลบคำถาม จาก id
questionsRouter.delete("/:questionId", async (req, res) => {
  try {
    const questionIdFromClient = req.params.questionId;
    const result = await pool.query(`delete from questions where id = $1`, [
      questionIdFromClient,
    ]);
    if (!result.rowCount) {
      return res.status(404).json({
        message: "Question not found.",
      });
    }
    return res
      .status(200)
      .json({ message: "Question post has been deleted successfully." });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to delete question.",
      error: error.message,
    });
  }
});
export default questionsRouter;
