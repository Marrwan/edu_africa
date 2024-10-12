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
const {dump} = require("js-yaml");


const app = express();
connectDB().then(r => {});

// app.use(cors());
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
    return res.redirect('/api/docs');
})
// Swagger Documentation Route
app.use('/api/docs', swaggerUi.serve, setup(swaggerSpec));

app.get('/api/docs/schema.json', (req, res) => {
    const jsonSchema = JSON.stringify(swaggerSpec, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=schema.json');
    return res.json(jsonSchema);
});

app.get('/api/docs/schema.yaml', (req, res) => {
    const yamlSchema = dump(swaggerSpec);
    res.setHeader('Content-Type', 'application/x-yaml');
    res.setHeader('Content-Disposition', 'attachment; filename=schema.yaml');
    return res.send(yamlSchema);
});
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
