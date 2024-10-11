const express = require('express');
const userController = require('../controllers/user.controller');
const { authenticateJWT } = require('../middlewares/auth.middleware');

const router = express.Router();


// User profile and account management
router.get('/profile', authenticateJWT, userController.getUserProfile);
router.put('/profile', authenticateJWT, userController.updateUserProfile);

// Course-related actions
router.post('/enroll/:courseId', authenticateJWT, userController.enrollInCourse);
router.get('/enrolled-courses', authenticateJWT, userController.getEnrolledCourses);
router.get('/course-progress/:courseId', authenticateJWT, userController.getCourseProgress);


module.exports = router;
