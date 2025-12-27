/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - razorpay_payment_id
 *         - razorpay_order_id
 *         - razorpay_signature
 *         - guideId
 *       properties:
 *         razorpay_payment_id:
 *           type: string
 *           description: Payment ID from Razorpay
 *           example: pay_Nx123456789
 *         razorpay_order_id:
 *           type: string
 *           description: Order ID from Razorpay
 *           example: order_Nx987654321
 *         razorpay_signature:
 *           type: string
 *           description: Payment signature from Razorpay
 *           example: 5a9f0c8b3c9a2d1e4f6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f
 *         guideId:
 *           type: string
 *           description: ID of the guide being purchased
 *           example: 65c9e7abc123def456789012
 *     PaymentResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65c9e7abc123def456789012
 *         razorpay_payment_id:
 *           type: string
 *           example: pay_Nx123456789
 *         razorpay_order_id:
 *           type: string
 *           example: order_Nx987654321
 *         razorpay_signature:
 *           type: string
 *           example: 5a9f0c8b3c9a2d1e4f6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f
 *         user:
 *           type: string
 *           example: 65c9e7abc123def456789012
 *         guide:
 *           type: string
 *           example: 65c9e7abc123def456789013
 *         amount:
 *           type: number
 *           example: 500
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     RazorpayOrder:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: order_Nx987654321
 *         entity:
 *           type: string
 *           example: order
 *         amount:
 *           type: number
 *           example: 50000
 *         amount_paid:
 *           type: number
 *           example: 0
 *         amount_due:
 *           type: number
 *           example: 50000
 *         currency:
 *           type: string
 *           example: INR
 *         receipt:
 *           type: string
 *           nullable: true
 *         status:
 *           type: string
 *           example: created
 *         attempts:
 *           type: number
 *           example: 0
 *         created_at:
 *           type: number
 *           example: 1704067200
 */

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment management APIs for purchasing guides
 */

/**
 * @swagger
 * /api/payment/order:
 *   post:
 *     summary: Create Razorpay Order for Guide Purchase
 *     description: Creates a Razorpay order for purchasing a guide. Requires authentication. The amount is automatically fetched from the guide's price.
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - guideId
 *             properties:
 *               guideId:
 *                 type: string
 *                 description: ID of the guide to purchase
 *                 example: 65c9e7abc123def456789012
 *     responses:
 *       200:
 *         description: Razorpay order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Order created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       $ref: '#/components/schemas/RazorpayOrder'
 *                     guideId:
 *                       type: string
 *                       example: 65c9e7abc123def456789012
 *                     amount:
 *                       type: number
 *                       description: Amount in INR (not in paise)
 *                       example: 500
 *       400:
 *         description: Bad request - Guide ID is required or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Guide ID is required
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Authentication required
 *       404:
 *         description: Guide not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Guide not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/payment/paymentVerification:
 *   post:
 *     summary: Verify Razorpay Payment and Record Purchase
 *     description: Verifies the Razorpay payment signature and records the purchase. Links the guide to the authenticated user. Requires authentication.
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       200:
 *         description: Payment verified successfully and purchase recorded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Payment verified successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     payment:
 *                       $ref: '#/components/schemas/PaymentResponse'
 *       400:
 *         description: Bad request - Invalid payment signature or missing guide ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid payment signature
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Authentication required
 *       404:
 *         description: Guide not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Guide not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/payment/my-purchases:
 *   get:
 *     summary: Get User's Purchased Guides
 *     description: Retrieves all guides that the authenticated user has purchased. Requires authentication.
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Purchased guides fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Purchased guides fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     guides:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 65c9e7abc123def456789012
 *                           title:
 *                             type: string
 *                             example: Complete Guide to JavaScript
 *                           description:
 *                             type: string
 *                             example: A comprehensive guide covering all aspects of JavaScript
 *                           image:
 *                             type: string
 *                             example: https://example.com/image.jpg
 *                           price:
 *                             type: number
 *                             example: 500
 *                           pdfUrl:
 *                             type: string
 *                             example: https://example.com/guide.pdf
 *                           chapters:
 *                             type: string
 *                             example: 10 chapters
 *                           image_detail:
 *                             type: object
 *                             properties:
 *                               image1:
 *                                 type: string
 *                               image2:
 *                                 type: string
 *                               image3:
 *                                 type: string
 *                               image4:
 *                                 type: string
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Authentication required
 *       500:
 *         description: Server error
 */
