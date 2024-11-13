import { Router } from "express";
import pool from "../utils/db.mjs";
const answersRouter = Router();
//โหวตเห็นด้วย ไม่เห็นด้วย ในคอมเม้น
answersRouter.post("/:answersId/vote", async (req, res) => {
  try {
    const answersId = req.params.answersId;
    const voteFromClient = req.body.vote;

    if (voteFromClient !== 1 && voteFromClient !== -1) {
      return res.status(400).json({ message: "Invalid vote value." });
    }

    await pool.query(`update answer_votes set vote = $1 where answer_id = $2`, [
      voteFromClient,
      answersId,
    ]);

    return res.status(200).json({
      message: "Vote on the answer has been recorded successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to vote answer.",
      error: error.message,
    });
  }
});
export default answersRouter;
