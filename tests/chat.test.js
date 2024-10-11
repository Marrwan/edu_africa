const request = require('supertest');
const app = require('../app'); // Your server file
const mongoose = require('mongoose');
const User = require('../models/user.model'); // Adjust path as necessary
const Chat = require('../models/chat.model'); // Adjust path as necessary

let token;
let user1;
let user2;

// Connect to test database
beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/testdb';
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Create test users
    user1 = await User.create({ name: 'User One', email: 'user1@example.com', password: 'password1' });
    user2 = await User.create({ name: 'User Two', email: 'user2@example.com', password: 'password2' });

    // Login and get JWT token
    const response = await request(app).post('/api/auth/login').send({ email: 'user1@example.com', password: 'password1' });
    console.log({response})
    token = response.body.token;
    console.log({ token });
});

afterAll(async () => {
    await User.deleteMany({});
    await Chat.deleteMany({});
    // await mongoose.connection.close();
});

describe('Chat API', () => {
    it('should send a message', async () => {
        const res = await request(app)
            .post(`/api/chats/${user2._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ message: 'Hello, User Two!' });

        expect(res.statusCode).toBe(201);
        expect(res.body.chat.message).toBe('Hello, User Two!');
    });

    it('should fetch chat messages between two users', async () => {
        const res = await request(app)
            .get(`/api/chats/${user2._id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
