/**
 * @swagger
 * /answers/{answersId}/vote:
 *   post:
 *     summary: "Vote up or down for a specific answer"
 *     description: "Allows users to vote up (+1) or down (-1) on a specific answer."
 *     tags:
 *       - Answers
 *     parameters:
 *       - in: path
 *         name: answersId
 *         required: true
 *         schema:
 *           type: integer
 *         description: "The ID of the answer to vote on"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vote:
 *                 $ref: '#/components/schemas/Answer/properties/vote'
 *           example:
 *             vote: 1
 *     responses:
 *       200:
 *         description: "Vote on the answer has been recorded successfully."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vote on the answer has been recorded successfully."
 *       400:
 *         description: "Invalid vote value."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid vote value."
 *       500:
 *         description: "Unable to vote answer."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unable to vote answer."
 *                 error:
 *                   type: string
 *                   example: "Detailed error message here"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: "The unique identifier for the answer"
 *           example: 1
 *         content:
 *           type: string
 *           description: "The content of the answer"
 *           example: "This is an example answer content."
 *         question_id:
 *           type: integer
 *           description: "The ID of the question this answer is related to"
 *           example: 5
 *         vote:
 *           type: integer
 *           description: "The vote on the answer, where 1 is an upvote and -1 is a downvote"
 *           example: 1
 *           enum: [1, -1]
 *       required:
 *         - id
 *         - content
 *         - question_id
 */
