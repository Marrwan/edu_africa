const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const faqSchema = new Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

const courseContentSchema = new Schema({
    type: { type: String, enum: ['video', 'quiz', 'pdf', 'article'], required: true },
    title: { type: String, required: true },
    duration: { type: Number },
    contentUrl: { type: String },
    additionalResources: { type: [String], default: [] }
});

const courseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    instructor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    language: { type: String, required: true },
    imageUrl: { type: String },
    syllabus: { type: [String], required: true },
    contents: [courseContentSchema],
    resources: { type: [String], default: [] },
    faqs: [faqSchema],
    enrollCount: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    numOfReviews: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);


const Course =  mongoose.model('Course', courseSchema);
module.exports = Course;
