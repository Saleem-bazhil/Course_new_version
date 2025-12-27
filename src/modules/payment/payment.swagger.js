/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - razorpay_payment_id
 *         - razorpay_order_id
 *         - razorpay_signature
 *       properties:
 *         razorpay_payment_id:
 *           type: string
 *           example: pay_Nx123456789
 *         razorpay_order_id:
 *           type: string
 *           example: order_Nx987654321
 *         razorpay_signature:
 *           type: string
 *           example: 5a9f0c8b3c9a2d1e...
 */

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Razorpay Payment APIs
 */

/**
 * @swagger
 * /api/payment/order:
 *   post:
 *     summary: Create Razorpay Order
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 500
 *     responses:
 *       200:
 *         description: Razorpay order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: order_Nx987654321
 *                 amount:
 *                   type: number
 *                   example: 500
 *                 currency:
 *                   type: string
 *                   example: INR
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/payment/paymentVerification:
 *   post:
 *     summary: Verify Razorpay Payment
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       200:
 *         description: Payment verified successfully
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
 *       400:
 *         description: Invalid signature
 *       500:
 *         description: Server error
 */