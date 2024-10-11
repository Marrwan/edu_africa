// config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const {PORT} = require("./config");

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'Documentation for the Node.js API using Swagger',
    },
    servers: [
        {
            url: `http://localhost:${PORT}`,
            description: 'Local server',
        },
        {
            url: 'https://edu-africa.onrender.com',
            description: 'Production server',
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            Course: {
                type: 'object',
                properties: {
                    title: { type: 'string', description: 'Course title' },
                    description: { type: 'string', description: 'Course description' },
                    price: { type: 'number', description: 'Course price' },
                    category: { type: 'string', description: 'Category ID' },
                    level: { type: 'string', enum: ['beginner', 'intermediate', 'advanced'] },
                    language: { type: 'string', description: 'Language of the course' },
                    syllabus: { type: 'array', items: { type: 'string' } },
                    imageUrl: { type: 'string', description: 'Image URL' },
                    resources: { type: 'array', items: { type: 'string' }, description: 'Resources URLs' }
                },
            },
        },
    },
    security: [{ bearerAuth: [] }],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to the API docs in the routes directory
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
