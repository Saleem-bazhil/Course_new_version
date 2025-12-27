/**
 * @swagger
 * tags:
 *   name: PDF
 *   description: PDF management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Pdf:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - chapters
 *         - pdfUrl
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *           example: 65c9e7abc123
 *         title:
 *           type: string
 *           example: Chemistry
 *         description:
 *           type: string
 *           example: Premium 12th standard guide
 *         chapters:
 *           type: string
 *           example: "20"
 *         pdfUrl:
 *           type: string
 *           example: https://example.com/book.pdf
 *         price:
 *           type: number
 *           example: 49
 *         image_detail:
 *           type: object
 *           properties:
 *             image1:
 *               type: string
 *             image2:
 *               type: string
 *             image3:
 *               type: string
 *             image4:
 *               type: string
 */

/**
 * @swagger
 * /api/pdf:
 *   get:
 *     summary: Get all PDFs
 *     tags: [PDF]
 *     responses:
 *       200:
 *         description: List of PDFs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pdf'
 */

/**
 * @swagger
 * /api/pdf/{id}:
 *   get:
 *     summary: Get PDF by ID
 *     tags: [PDF]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PDF fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pdf'
 *       404:
 *         description: PDF not found
 */

/**
 * @swagger
 * /api/pdf:
 *   post:
 *     summary: Create new PDF
 *     tags: [PDF]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pdf'
 *     responses:
 *       201:
 *         description: PDF created successfully
 */

/**
 * @swagger
 * /api/pdf/{id}:
 *   put:
 *     summary: Update PDF (full update)
 *     tags: [PDF]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pdf'
 *     responses:
 *       200:
 *         description: PDF updated successfully
 */

/**
 * @swagger
 * /api/pdf/{id}:
 *   patch:
 *     summary: Update PDF (partial update)
 *     tags: [PDF]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PDF updated successfully
 */

/**
 * @swagger
 * /api/pdf/{id}:
 *   delete:
 *     summary: Delete PDF
 *     tags: [PDF]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PDF deleted successfully
 */
