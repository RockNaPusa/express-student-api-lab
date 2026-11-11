const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number,
    isActive: Boolean,
    // Add relationship: Which user created this student?
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    // Add relationship: What courses is this student taking? (Many-to-Many)
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);