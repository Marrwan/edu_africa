const courseService = require('../services/courseService');

// Create a new course
exports.createCourse = async (req, res) => {
    try {
        const instructorId = req.user.id;

        const course = await courseService.createCourse(req.body, instructorId);
        res.status(201).json({ message: 'Course created successfully', course });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await courseService.getAllCourses();
        return res.json(courses);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await courseService.getCourseById(courseId);
        res.status(200).json(course);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Update a course
exports.updateCourse = async (req, res) => {
    try {
        const course = await courseService.updateCourse(req.params.id, req.body);
        return res.json({ message: 'Course updated successfully', course });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
    try {
        await courseService.deleteCourse(req.params.id);
        return res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
