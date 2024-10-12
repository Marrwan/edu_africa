const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = require('./app');
const { PORT } = require("./config/config");
const {Server} = require("socket.io");
const server = http.createServer(app);
// const io = socketIo(server);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// Socket.io for real-time messaging
io.on('connection', (socket) => {
    console.log('User connected');

    // Handle receiving and broadcasting chat messages
    socket.on('sendMessage', async (data) => {
        const { senderId, recipientId, message } = data;
        try {
            const chat = await require('./services/chat.services').sendMessage(senderId, recipientId, message);

            socket.to(recipientId).emit('message', chat);

            socket.emit('message', chat);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
