const Joi = require('joi');

// Validation schema for sending a chat message
exports.sendMessageSchema = Joi.object({
    message: Joi.string().min(1).required()
});
