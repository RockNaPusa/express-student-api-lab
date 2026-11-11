const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    credits: { type: Number, default: 3 }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);