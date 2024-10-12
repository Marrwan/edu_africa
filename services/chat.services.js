const Chat = require('../models/chat.model');

exports.sendMessage = async (senderId, recipientId, message) => {
    const chat = new Chat({
        sender: senderId,
        recipient: recipientId,
        message
    });

    return await chat.save();
};

exports.getUserChats = async (senderId, recipientId) => {
    return Chat.find({
        $or: [
            {sender: senderId, recipient: recipientId},
            {sender: recipientId, recipient: senderId}
        ]
    }).populate('sender recipient');
};

// Fetch chat messages between two users
// exports.getChats = async (userId, recipientId) => {
//     return await Chat.find({
//         $or: [
//             { sender: userId, recipient: recipientId },
//             { sender: recipientId, recipient: userId }
//         ]
//     }).sort({ timestamp: 1 });
// };
