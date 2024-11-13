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
//ค้นหาคำถามจากหัวข้อ หรือหมวดหมู่
questionsRouter.get("/search", async (req, res) => {
  try {
    const title = req.query.title;
    const category = req.query.category;
    let query = "select * from questions";
    let conditions = [];
    let values = [];

    if (title) {
      conditions.push(`title ilike $${values.length + 1}`);
      values.push(`%${title}%`);
    }
    if (category) {
      conditions.push(`category ilike $${values.length + 1}`);
      values.push(`%${category}%`);
    }

    if (conditions.length > 0) {
      query += ` where ` + conditions.join(" and ");
    }

    const results = await pool.query(query, values);
    return res.status(200).json({
      data: results.rows,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unable to fetch a question.", error: error.message });
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
  const newAnswer = {
    ...req.body,
  };
  try {
    await pool.query(
      `insert into questions (title, description, category)
             values ($1, $2, $3)`,
      [newAnswer.title, newAnswer.description, newAnswer.category]
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
//ลบคอมเม้น
questionsRouter.delete("/:questionId/answers", async (req, res) => {
  try {
    const questionIdFromClient = req.params.questionId;
    const result = await pool.query(
      `delete from answers where question_id = $1`,
      [questionIdFromClient]
    );
    if (!result.rowCount) {
      return res.status(404).json({
        message: "Question not found.",
      });
    }
    return res.status(200).json({
      message: "All answers for the question have been deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to delete answers.",
      error: error.message,
    });
  }
});
//ดูคอมเม้น ตาม question id
questionsRouter.get("/:questionId/answers", async (req, res) => {
  try {
    const questionIdFromClient = req.params.questionId;
    const result = await pool.query(
      `select answers.id, answers.content as content
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
      data: result.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch answers.",
      error: error.message,
    });
  }
});
//สร้างคอมเม้นตาม question id
questionsRouter.post("/:questionId/answers", async (req, res) => {
  try {
    const newAnswer = {
      ...req.body,
    };
    const questionId = req.params.questionId;
    await pool.query(
      `insert into answers (question_id,content)
values ($1,$2)`,
      [questionId, newAnswer.content]
    );

    return res.status(201).json({
      message: "Answer created successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create answers.",
      error: error.message,
    });
  }
});
//โหวตเห็นด้วย ไม่เห็นด้วย
questionsRouter.post("/:questionId/vote", async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const voteFromClient = req.body.vote;

    if (voteFromClient !== 1 && voteFromClient !== -1) {
      return res.status(400).json({ message: "Invalid vote value." });
    }

    await pool.query(
      `update question_votes set vote = $1 where question_id = $2`,
      [voteFromClient, questionId]
    );

    return res.status(200).json({
      message: "Vote on the question has been recorded successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to vote question.",
      error: error.message,
    });
  }
});

export default questionsRouter;
