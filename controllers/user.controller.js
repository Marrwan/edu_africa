const userService = require('../services/user.services');

// Get the user's profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await userService.getUserProfile(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Update the user's profile
exports.updateUserProfile = async (req, res) => {
    try {
        const user = await userService.updateUserProfile(req.user.id, req.body);
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Enroll user in a course
exports.enrollInCourse = async (req, res) => {
    try {
        const user = await userService.enrollInCourse(req.user.id, req.params.courseId);
        res.json({ message: 'Enrolled in course successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get courses enrolled by the user
exports.getEnrolledCourses = async (req, res) => {
    try {
        const courses = await userService.getEnrolledCourses(req.user.id);
        res.json(courses);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Get progress for a specific course
exports.getCourseProgress = async (req, res) => {
    try {
        const progress = await userService.getCourseProgress(req.user.id, req.params.courseId);
        res.json(progress);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.findAllUsers()
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


