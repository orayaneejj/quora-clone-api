/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Get all questions
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: List of all questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "What is the meaning of life?"
 *                   description:
 *                     type: string
 *                     example: "A philosophical question about purpose."
 *                   category:
 *                     type: string
 *                     example: "Philosophy"
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /questions/search:
 *   get:
 *     summary: Search questions by title or category
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Title of the question
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category of the question
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 *       400:
 *         description: Invalid search parameters (when neither title nor category are provided)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid search parameters."
 *       404:
 *         description: No questions found matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No questions found matching the search criteria."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unable to fetch a question."
 *                 error:
 *                   type: string
 *                   example: "Detailed error message here"
 */

/**
 * @swagger
 * /questions/{questionId}:
 *   get:
 *     summary: Get question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The question details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: Question not found
 */

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Question created successfully
 *       500:
 *         description: Unable to create question
 */

/**
 * @swagger
 * /questions/{questionId}:
 *   put:
 *     summary: Update a question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Question updated successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Unable to update question
 */

/**
 * @swagger
 * /questions/{questionId}:
 *   delete:
 *     summary: Delete a question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Unable to delete question
 */

/**
 * @swagger
 * /questions/{questionId}/answers:
 *   get:
 *     summary: Get answers for a question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of answers for the question
 *       404:
 *         description: Question not found
 *       500:
 *         description: Unable to fetch answers
 */

/**
 * @swagger
 * /questions/{questionId}/answers:
 *   post:
 *     summary: Add an answer to a question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Answer created successfully
 *       500:
 *         description: Unable to create answer
 */
/**
 * @swagger
 * /questions/{questionId}/vote:
 *   post:
 *     summary: "Vote up or down for a specific question"
 *     description: "Allows users to vote up (+1) or down (-1) on a specific question."
 *     tags:
 *       - Questions
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: "The ID of the question to vote on"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               vote:
 *                 $ref: '#/components/schemas/Question/properties/vote'
 *           example:
 *             vote: 1
 *     responses:
 *       200:
 *         description: "Vote on the question has been recorded successfully."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vote on the question has been recorded successfully."
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
 *         description: "Unable to vote on question."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unable to vote on question."
 *                 error:
 *                   type: string
 *                   example: "Detailed error message here"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: "The unique identifier for the question"
 *           example: 1
 *         title:
 *           type: string
 *           description: "The title of the question"
 *           example: "What is the meaning of life?"
 *         description:
 *           type: string
 *           description: "The description of the question"
 *           example: "A philosophical question about purpose."
 *         category:
 *           type: string
 *           description: "The category of the question"
 *           example: "Philosophy"
 *         vote:
 *           type: integer
 *           description: "The vote on the question, where 1 is an upvote and -1 is a downvote"
 *           example: 1
 *           enum: [1, -1]
 *       required:
 *         - id
 *         - title
 *         - description
 *         - category
 */
