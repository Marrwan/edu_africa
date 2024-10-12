// config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const { PORT } = require('./config');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'Documentation for the Node.js API using Swagger',
        contact: {
            name: 'Abdulbasit Damilola Alabi',
            email: 'abdulbasitdamilola6@gmail.com',
            url: 'https://github.com/marrwan',
        },
    },
    servers: [
        {
            url: `http://localhost:${PORT}`,
            description: 'Local server',
        },
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
            User: {
                type: 'object',
                properties: {
                    name: { type: 'string', description: 'Name of the user' },
                    email: { type: 'string', description: 'User email' },
                    profilePicture: { type: 'string', description: 'Profile picture URL' },
                    coursesEnrolled: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                course: { $ref: '#/components/schemas/Course' },
                                progress: { type: 'number', description: 'Progress percentage' },
                                status: { type: 'string', enum: ['in-progress', 'completed'], description: 'Course status' },
                            },
                        },
                    },
                    createdAt: { type: 'string', format: 'date-time', description: 'Account creation date' },
                },
            },
            Course: {
                type: 'object',
                properties: {
                    title: { type: 'string', description: 'Course title' },
                    description: { type: 'string', description: 'Course description' },
                    price: { type: 'number', description: 'Course price' },
                    category: { type: 'string', description: 'Category ID' },
                    level: { type: 'string', enum: ['beginner', 'intermediate', 'advanced'], description: 'Course level' },
                    language: { type: 'string', description: 'Language of the course' },
                    syllabus: { type: 'array', items: { type: 'string' }, description: 'Course syllabus' },
                    imageUrl: { type: 'string', description: 'URL of the course image' },
                    resources: { type: 'array', items: { type: 'string' }, description: 'Course resources' },
                    contents: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                type: { type: 'string', enum: ['video', 'quiz', 'pdf', 'article'], description: 'Content type' },
                                title: { type: 'string', description: 'Content title' },
                                duration: { type: 'number', description: 'Content duration in minutes' },
                                contentUrl: { type: 'string', description: 'URL for the content' },
                                additionalResources: { type: 'array', items: { type: 'string' }, description: 'Additional resources' },
                            },
                        },
                    },
                    faqs: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                question: { type: 'string', description: 'FAQ question' },
                                answer: { type: 'string', description: 'FAQ answer' },
                            },
                        },
                    },
                    enrollCount: { type: 'number', description: 'Number of students enrolled' },
                    rating: { type: 'number', description: 'Average course rating' },
                },
            },
            Chat: {
                    type: 'object',
                    properties: {
                        sender: { type: 'string', description: 'Sender user ID' },
                        recipient: { type: 'string', description: 'Recipient user ID' },
                        message: { type: 'string', description: 'Chat message' },
                        timestamp: { type: 'string', format: 'date-time', description: 'Message timestamp' },
                    },
            },
        },
    },
    security: [{ bearerAuth: [] }],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
