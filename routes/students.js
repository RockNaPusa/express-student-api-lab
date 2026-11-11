const requireAuth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Course = require('../models/Course');

router.get('/stats', requireAuth, async (req, res) => {
    try {
        const stats = await Student.aggregate([
            { $match: { isActive: true } }, // Stage 1: Filter only active students
            { $group: { _id: "$age", totalActive: { $sum: 1 } } }, // Stage 2: Group by age and count
            { $sort: { totalActive: -1 } } // Stage 3: Sort by highest count
        ]);
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET 
router.get('/', requireAuth, async (req, res) => {
    try {
        const students = await Student.find()
            .populate('createdBy', 'email role -_id') 
            .populate('enrolledCourses', 'title code');
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST 
router.post('/', requireAuth, async (req, res) => {
    try {
        // Automatically assign the logged-in user's ID as the creator
        const studentData = { ...req.body, createdBy: req.userId }; 
        const newStudent = await Student.create(studentData);
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT 
router.put('/:id', requireAuth, async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id, req.body, { new: true, runValidators: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE student
router.delete('/:id', requireAuth, async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully', deletedStudent });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET 
router.get('/stats/summary', requireAuth, async (req, res) => {
    try {
        const stats = await Student.aggregate([
            // Stage 1: Only look at active students
            { $match: { isActive: true } },
            
            // Stage 2: Group them by age to see how many active students are in each age bracket
            { $group: {
                _id: "$age",
                totalStudents: { $sum: 1 },
                names: { $push: "$name" }
            }},

            // Stage 3: Sort by age descending (oldest first)
            { $sort: { _id: -1 } }
        ]);

        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;