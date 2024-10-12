const User = require('../models/user.model');
const Course = require('../models/course.model');

exports.getUserProfile = async (userId) => {
    return User.findById(userId).populate('coursesEnrolled.course');
};

exports.updateUserProfile = async (userId, profileData) => {
    return User.findByIdAndUpdate(userId, profileData, {new: true});
};

exports.enrollInCourse = async (userId, courseId) => {
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!course) {
        throw new Error('Course not found');
    }

    // Check if already enrolled
    const isEnrolled = user.coursesEnrolled.some(c => c.course.toString() === courseId);
    if (isEnrolled) {
        throw new Error('User is already enrolled in this course');
    }

    user.coursesEnrolled.push({ course: courseId });
    course.enrollCount += 1;
    await course.save();
    return await user.save();
};

exports.getEnrolledCourses = async (userId) => {
    const user = await User.findById(userId).populate('coursesEnrolled.course');
    if (!user) {
        throw new Error('User not found');
    }
    return user.coursesEnrolled;
};

exports.getCourseProgress = async (userId, courseId) => {
    const user = await User.findById(userId);
    const courseProgress = user.coursesEnrolled.find(c => c.course.toString() === courseId);
    if (!courseProgress) {
        throw new Error('Course progress not found');
    }
    return courseProgress;
};

exports.findAllUsers = async () => {
    return User.find().select('name email profilePicture');
}