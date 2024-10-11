const express = require('express');
const {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
} = require('../controllers/course.controller');

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
router.post('/', createCourse);
router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
