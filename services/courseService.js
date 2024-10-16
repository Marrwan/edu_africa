const Course = require('../models/course.model');
const Category = require('../models/category.model');

exports.createCourse = async (courseData, instructorId) => {
    const { title, description, price, category, level, language, syllabus, imageUrl, resources, contents = [], faqs = [] } = courseData;

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
        throw new Error('Category not found');
    }

    const course = new Course({
        title,
        description,
        price,
        category,
        instructor: instructorId,
        level,
        language,
        syllabus,
        imageUrl,
        resources,
        contents,
        faqs
    });

    return await course.save();
};


exports.getAllCourses = async () => {
    return Course.find().populate('category').populate('instructor');
};

exports.updateCourse = async (courseId, courseData) => {
    return Course.findByIdAndUpdate(courseId, courseData, {new: true});
};

exports.deleteCourse = async (courseId) => {
    return Course.findByIdAndDelete(courseId);
};


const enrollUserInCourse = async (userId, courseId) => {
    // Fetch user and course, then add logic to enroll
};

exports.getCourseById = async (courseId) => {
    // Find the course by ID and populate related fields (e.g., instructor and category)
    const course = await Course.findById(courseId)
        .populate('instructor', 'name email')
        .populate('category', 'name description');

    if (!course) {
        throw new Error('Course not found');
    }

    return course;
};
module.exports = {
    enrollUserInCourse,
};
