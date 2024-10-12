const express = require('express');
const chatController = require('../controllers/chat.controller');
const { authenticateJWT } = require('../middlewares/auth.middleware');
const validationMiddleware = require("../middlewares/validation.middleware");
const {sendMessageSchema} = require("../validators/chat.validators");

const router = express.Router();

/**
 * @swagger
 * /api/chat/{recipientId}:
 *   get:
 *     summary: Fetch chat messages between two users
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the recipient user
 *     responses:
 *       200:
 *         description: List of chat messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 *       404:
 *         description: User or chat not found
 */
router.get('/:recipientId', authenticateJWT, chatController.getChats);

/**
 * @swagger
 * /api/chat/{recipientId}:
 *   post:
 *     summary: Send a chat message
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: recipientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the recipient user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *             example:
 *               message: "Hello, how are you?"
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       400:
 *         description: Validation error
 */
router.post('/:recipientId', authenticateJWT, validationMiddleware(sendMessageSchema), chatController.sendMessage);

module.exports = router;
