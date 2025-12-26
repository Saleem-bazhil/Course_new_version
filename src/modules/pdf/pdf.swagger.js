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
 *         - image
 *         - title
 *         - description
 *         - chapters
 *         - pdfUrl
 *         - price
 *         - image_detail
 *       properties:
 *         image:
 *           type: string
 *           example: "https://example.com/main.jpg"
 *         title:
 *           type: string
 *           example: "React Complete Guide"
 *         description:
 *           type: string
 *           example: "Beginner to Advanced React PDF"
 *         chapters:
 *           type: string
 *           example: "20"
 *         pdfUrl:
 *           type: string
 *           example: "https://example.com/react.pdf"
 *         price:
 *           type: number
 *           example: 999
 *         image_detail:
 *           type: object
 *           required:
 *             - image1
 *             - image2
 *             - image3
 *             - image4
 *           properties:
 *             image1:
 *               type: string
 *               example: "https://example.com/1.jpg"
 *             image2:
 *               type: string
 *               example: "https://example.com/2.jpg"
 *             image3:
 *               type: string
 *               example: "https://example.com/3.jpg"
 *             image4:
 *               type: string
 *               example: "https://example.com/4.jpg"
 */

/**
 * @swagger
 * /api/pdf:
 *   get:
 *     tags: [PDF]
 *     summary: Get all PDFs
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
 * /api/pdf:
 *   post:
 *     tags: [PDF]
 *     summary: Create a new PDF
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pdf'
 *     responses:
 *       201:
 *         description: PDF created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pdf'
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/pdf/{id}:
 *   put:
 *     tags: [PDF]
 *     summary: Update PDF (full update)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: PDF ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pdf'
 *     responses:
 *       200:
 *         description: PDF updated successfully
 *       404:
 *         description: PDF not found
 */

/**
 * @swagger
 * /api/pdf/{id}:
 *   patch:
 *     tags: [PDF]
 *     summary: Update PDF (partial update)
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
 *           example:
 *             price: 1200
 *     responses:
 *       200:
 *         description: PDF updated successfully
 *       404:
 *         description: PDF not found
 */

/**
 * @swagger
 * /api/pdf/{id}:
 *   delete:
 *     tags: [PDF]
 *     summary: Delete PDF
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PDF deleted successfully
 *       404:
 *         description: PDF not found
 */
