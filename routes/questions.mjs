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
      message: "Server could not read questions because database issue",
      error: error.message,
    });
  }
});

//ดูคำถามจาก id
questionsRouter.get("/:id", async (req, res) => {
  try {
    const questionIdFromClient = req.params.id;
    const result = await pool.query(`select * from questions where id = $1`, [
      questionIdFromClient,
    ]);
    if (!result.rows[0]) {
      return res.status(404).json({
        message: "Server could not find a requested question",
      });
    }
    return res.status(200).json({
      data: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read questions because database issue",
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
      message: "Created questions successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not create questions because of database issue",
      error: error.message,
    });
  }
});
//แก้ไขคำถาม จาก id
questionsRouter.put("/:id", validateQuestionData, async (req, res) => {
  try {
    const questionIdFromClient = req.params.id;
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
        message: "Server could not find a requested question to update",
      });
    }
    return res.status(200).json({ message: "Updated question sucessfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read question because database issue",
      error: error.message,
    });
  }
});
//ลบคำถาม จาก id
questionsRouter.delete("/:id", async (req, res) => {
  try {
    const questionIdFromClient = req.params.id;
    const result = await pool.query(`delete from questions where id = $1`, [
      questionIdFromClient,
    ]);
    if (!result.rowCount) {
      return res.status(404).json({
        message: "Server could not find a requested question to delete",
      });
    }
    return res.status(200).json({ message: "Deleted question sucessfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read question because database issue",
      error: error.message,
    });
  }
});
export default questionsRouter;
