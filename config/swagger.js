// config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'Documentation for the Node.js API using Swagger',
    },
    servers: [
        {
            url: 'http://localhost:4000',
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
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to the API docs in the routes directory
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
