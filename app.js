const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database.config');
const authRoutes = require('./routes/auth.route');
const chatRoutes = require('./routes/chat.route');
const courseRoutes = require('./routes/course.route');
const userRoutes = require('./routes/user.route');
const {setup} = require("swagger-ui-express");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require("./config/swagger");


const app = express();
// connectDB().then(r => {});

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);

// Swagger Documentation Route
app.use('/api/docs', swaggerUi.serve, setup(swaggerSpec));

// Handle 404 errors for unknown routes
app.use('*', (req, res) => {
    res.status(404).send('Not Found');
});

// // Error handling middleware (should be defined last)
// app.use((err, req, res, next) => {
//     // Make sure to call `next` to pass control to the next middleware
//     console.error(err); // Log the error for debugging purposes
//     return res.status(500).json({ message: err.message });
// });


module.exports = app;
