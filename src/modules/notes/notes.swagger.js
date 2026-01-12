/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Personal course notes (private to user)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65a2f1d9c12ab12345678901
 *         title:
 *           type: string
 *           example: Python Basics Notes
 *         content:
 *           type: string
 *           example: Variables, loops, functions
 *         course:
 *           type: string
 *           example: 65a1aa11bb22cc33dd44ee55
 *         user:
 *           type: string
 *           example: 65a0ff123abc456def78901
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - course
 *             properties:
 *               title:
 *                 type: string
 *                 example: React Hooks
 *               content:
 *                 type: string
 *                 example: useState, useEffect, custom hooks
 *               course:
 *                 type: string
 *                 example: 65a1aa11bb22cc33dd44ee55
 *     responses:
 *       201:
 *         description: Note created successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/notes/course/{courseId}:
 *   get:
 *     summary: Get all notes for a course (user specific)
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         example: 65a1aa11bb22cc33dd44ee55
 *     responses:
 *       200:
 *         description: Notes fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65a2f1d9c12ab12345678901
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated note title
 *               content:
 *                 type: string
 *                 example: Updated note content
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       403:
 *         description: Forbidden
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65a2f1d9c12ab12345678901
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       403:
 *         description: Forbidden
 *       401:
 *         description: Unauthorized
 */
