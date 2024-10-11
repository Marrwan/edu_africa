const express = require('express');
const {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
} = require('../controllers/course.controller');
const {authenticateJWT} = require("../middlewares/auth.middleware");
const validationMiddleware = require("../middlewares/validation.middleware");
const {courseSchema} = require("../validators/course.validators");

const router = express.Router();


/**
* @swagger
* /api/courses:
    *   post:
    *     summary: Create a new course
*     tags: [Courses]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
    *             $ref: '#/components/schemas/Course'
*     responses:
*       201:
*         description: Course created successfully
*       400:
*         description: Validation error
*/
router.post('/', authenticateJWT, validationMiddleware(courseSchema), createCourse);

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of courses
 *       500:
 *         description: Server error
 */
router.get('/', authenticateJWT, getAllCourses);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Course details
 *       404:
 *         description: Course not found
 */
router.get('/:id', authenticateJWT, getCourseById);

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       400:
 *         description: Validation error
 */
router.put('/:id', authenticateJWT, validationMiddleware(courseSchema), updateCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 */
router.delete('/:id', authenticateJWT, deleteCourse);

module.exports = router;
