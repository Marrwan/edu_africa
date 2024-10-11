const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    profilePicture: { type: String },
    coursesEnrolled: [{
        course: { type: Schema.Types.ObjectId, ref: 'Course' },
        progress: { type: Number, default: 0 },
        status: { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' }
    }],
    createdAt: { type: Date, default: Date.now },
});

const User =  mongoose.model('User', userSchema);
module.exports = User;
