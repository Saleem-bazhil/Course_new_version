/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65fa12bc90a12e001234abcd
 *         title:
 *           type: string
 *           example: React Full Course
 *         description:
 *           type: string
 *           example: Complete React course from basics to advanced
 *         rating:
 *           type: number
 *           example: 4.8
 *         hours:
 *           type: number
 *           example: 40
 *         image:
 *           type: string
 *           example: https://cdn.site.com/react.png
 *         price:
 *           type: number
 *           example: 999
 *         chapters:
 *           type: array
 *           items:
 *             type: string
 *             example: 65fa12bc90a12e00999abcde
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
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
 *           example: React Full Course
 *         description:
 *           type: string
 *           example: Complete React course
 *         hours:
 *           type: number
 *           example: 40
 *         image:
 *           type: string
 *           example: https://cdn.site.com/react.png
 *         price:
 *           type: number
 *           example: 999
 */

/**
 * @swagger
 * tags:
 *   - name: Course
 *     description: Course management APIs
 */

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
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
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
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
 *     summary: Get course by ID
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
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

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update course by ID
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCourse'
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       404:
 *         description: Course not found
 */

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete course by ID
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     CourseChapter:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65fa12bc90a12e00999abcde
 *         courseId:
 *           type: string
 *           example: 65fa12bc90a12e001234abcd
 *         chapter_title:
 *           type: string
 *           example: Introduction to Python
 *         chapter_description:
 *           type: string
 *           example: Overview of Python, installation, syntax, and first program.
 *         duration:
 *           type: number
 *           example: 90
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateCourseChapter:
 *       type: object
 *       required:
 *         - courseId
 *         - chapter_title
 *         - chapter_description
 *         - duration
 *       properties:
 *         courseId:
 *           type: string
 *           example: 65fa12bc90a12e001234abcd
 *         chapter_title:
 *           type: string
 *           example: Introduction to Python
 *         chapter_description:
 *           type: string
 *           example: Overview of Python, installation, syntax, and first program.
 *         duration:
 *           type: number
 *           example: 90
 */

/**
 * @swagger
 * tags:
 *   - name: CourseChapter
 *     description: Course chapter management APIs
 */

/**
 * @swagger
 * /api/course-chapters:
 *   post:
 *     summary: Create a chapter for a course
 *     tags: [CourseChapter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCourseChapter'
 *     responses:
 *       201:
 *         description: Chapter created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseChapter'
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/course-chapters/{courseId}:
 *   get:
 *     summary: Get all chapters for a course
 *     tags: [CourseChapter]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Chapters fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CourseChapter'
 *       404:
 *         description: Course not found
 */

