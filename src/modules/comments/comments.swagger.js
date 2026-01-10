/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Course comments & replies (YouTube style)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65a1b9c3f1e9c91234567890
 *         content:
 *           type: string
 *           example: This course explanation is very clear!
 *         user:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: 65a1b9c3f1e9c90000000001
 *             name:
 *               type: string
 *               example: Saleem
 *         course:
 *           type: string
 *           example: 65a1b9c3f1e9c90000000002
 *         parentComment:
 *           type: string
 *           nullable: true
 *           example: null
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Add a new comment or reply
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - courseId
 *             properties:
 *               content:
 *                 type: string
 *                 example: This lecture is awesome!
 *               courseId:
 *                 type: string
 *                 example: 65a1b9c3f1e9c90000000002
 *               parentComment:
 *                 type: string
 *                 nullable: true
 *                 example: 65a1b9c3f1e9c91234567890
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/comments/course/{courseId}:
 *   get:
 *     summary: Get all comments for a specific course
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         example: 65a1b9c3f1e9c90000000002
 *     responses:
 *       200:
 *         description: Course comments fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */

/**
 * @swagger
 * /api/comments/replies/{commentId}:
 *   get:
 *     summary: Get replies for a specific comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         example: 65a1b9c3f1e9c91234567890
 *     responses:
 *       200:
 *         description: Replies fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Delete own comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65a1b9c3f1e9c91234567890
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       403:
 *         description: Not allowed to delete this comment
 *       401:
 *         description: Unauthorized
 */
