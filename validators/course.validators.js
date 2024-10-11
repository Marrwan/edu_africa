const Joi = require('joi');

exports.courseSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().required(),
    level: Joi.string().valid('beginner', 'intermediate', 'advanced').required(),
    language: Joi.string().min(2).required(),
    syllabus: Joi.array().items(Joi.string().min(5)).required(),
    imageUrl: Joi.string().uri(),
    resources: Joi.array().items(Joi.string().uri()),
    contents: Joi.array().items(Joi.object({
        type: Joi.string().valid('video', 'quiz', 'pdf', 'article').required(),
        title: Joi.string().min(3).required(),
        duration: Joi.number().min(0),
        contentUrl: Joi.string().uri(),
        additionalResources: Joi.array().items(Joi.string().uri()),
    })).optional(),
    faqs: Joi.array().items(Joi.object({
        question: Joi.string().min(5).required(),
        answer: Joi.string().min(5).required(),
    })).optional()
});
