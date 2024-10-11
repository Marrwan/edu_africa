const express = require('express');
const userController = require('../controllers/user.controller');
const { authenticateJWT } = require('../middlewares/auth.middleware');
const {updateProfileSchema} = require("../validators/user.validators");
const validationMiddleware = require("../middlewares/validation.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized access
 */
router.get('/profile', authenticateJWT, userController.getUserProfile);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update the authenticated user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *             example:
 *               name: "John Doe"
 *               email: "johndoe@example.com"
 *               profilePicture: "https://example.com/profile.jpg"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Validation error
 */
router.put('/profile', authenticateJWT, validationMiddleware(updateProfileSchema), userController.updateUserProfile);

/**
 * @swagger
 * /api/users/enroll/{courseId}:
 *   post:
 *     summary: Enroll the authenticated user in a course
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the course to enroll in
 *     responses:
 *       200:
 *         description: Enrolled in course successfully
 *       400:
 *         description: Validation error
 */
router.post('/enroll/:courseId', authenticateJWT, userController.enrollInCourse);

/**
 * @swagger
 * /api/users/enrolled-courses:
 *   get:
 *     summary: Get courses the authenticated user is enrolled in
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of enrolled courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       404:
 *         description: No enrolled courses found
 */
router.get('/enrolled-courses', authenticateJWT, userController.getEnrolledCourses);

/**
 * @swagger
 * /api/users/course-progress/{courseId}:
 *   get:
 *     summary: Get the user's progress in a specific course
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the course
 *     responses:
 *       200:
 *         description: Course progress details
 *       404:
 *         description: Course progress not found
 */
router.get('/course-progress/:courseId', authenticateJWT, userController.getCourseProgress);



module.exports = router;
