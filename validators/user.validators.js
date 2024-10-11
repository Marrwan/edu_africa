const Joi = require('joi');

// Validation schema for user signup
exports.signupSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

// Validation schema for user login
exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),

});

// Validation schema for updating user profile
exports.updateProfileSchema = Joi.object({
    name: Joi.string().min(3).max(50),
    email: Joi.string().email(),
    profilePicture: Joi.string().uri(),
}).or('name', 'email', 'profilePicture');

// Validation schema for enrolling in a course
exports.enrollCourseSchema = Joi.object({
    courseId: Joi.string().required(),
});
