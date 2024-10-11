const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = require('./app');
const server = http.createServer(app);
const io = socketIo(server);

// io.on('connection', (socket) => {
//     console.log('User connected');
//
//     socket.on('sendMessage', (data) => {
//         // Save message to DB and broadcast it
//         io.emit('receiveMessage', data);
//     });
//
//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });
// });


// Socket.io for real-time messaging
io.on('connection', (socket) => {
    console.log('User connected');

    // Handle receiving and broadcasting chat messages
    socket.on('sendMessage', async (data) => {
        const { senderId, recipientId, message } = data;
        try {
            const chat = await require('./services/chat.services').sendMessage(senderId, recipientId, message);
            io.emit('receiveMessage', chat);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


server.listen(4000, () => {
    console.log('Server running on port 3000');
});
