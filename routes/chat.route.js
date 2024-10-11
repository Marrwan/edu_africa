const express = require('express');
const chatController = require('../controllers/chat.controller');
const { authenticateJWT } = require('../middlewares/auth.middleware');

const router = express.Router();

// Fetch chat messages between two users
router.get('/:recipientId', authenticateJWT, chatController.getChats);

// Send a new chat message
router.post('/:recipientId', authenticateJWT, chatController.sendMessage);

module.exports = router;
