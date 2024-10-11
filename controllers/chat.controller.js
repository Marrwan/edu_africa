const {getUserChats, sendMessage} = require('../services/chat.services');

exports.getChats = async (req, res) => {
    try {
        const { recipientId } = req.params;
        const chats = await getUserChats(req.user.id, recipientId);
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        const { recipientId } = req.params;
        const { message } = req.body;
        const chat = await sendMessage(req.user.id, recipientId, message);
        res.status(201).json({ message: 'Message sent successfully', chat });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
