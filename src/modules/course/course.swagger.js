/**
 * @swagger
 * components:
 *   schemas:
 *
 *     CreateCourse:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - hours
 *         - image
 *         - price
 *       properties:
 *         title:
 *           type: string
 *           example: Complete Python Programming
 *         description:
 *           type: string
 *           example: Master Python from basics to advanced
 *         hours:
 *           type: number
 *           example: 45
 *         image:
 *           type: string
 *           example: https://cdn.site.com/python.png
 *         price:
 *           type: number
 *           example: 1299
 *
 *     CourseChapter:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65fa12bc90a12e00999abcde
 *         chapter_title:
 *           type: string
 *           example: Introduction to Python
 *         chapter_description:
 *           type: string
 *           example: Python basics and setup
 *         duration:
 *           type: number
 *           example: 120
 *
 *     Course:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65fa12bc90a12e001234abcd
 *         title:
 *           type: string
 *           example: Complete Python Programming
 *         description:
 *           type: string
 *           example: Master Python from basics to advanced
 *         rating:
 *           type: number
 *           example: 4.8
 *         hours:
 *           type: number
 *           example: 45
 *         image:
 *           type: string
 *           example: https://cdn.site.com/python.png
 *         price:
 *           type: number
 *           example: 1299
 *         chapters:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CourseChapter'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a course
 *     tags: [Course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCourse'
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses with chapters
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: Courses fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get course by ID with chapters
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course fetched successfully
 *         content:
 *           application/json:  
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 */
