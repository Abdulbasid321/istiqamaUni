const express = require("express");
const Course = require("../model/Course");
// const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

// Create a new course (only for instructors/admins)
router.post("/course", 
    // authenticate, authorize(["instructor", "admin"]), 
    async (req, res) => {
  try {
    const { name, code, instructor, status, semester, level } = req.body;

    const existingCourse = await Course.findOne({ code });
    if (existingCourse) {
      return res.status(400).json({ message: "Course code already exists" });
    }

    const newCourse = new Course({ name, code, instructor, status, semester, level });
    await newCourse.save();

    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Error creating course", error: error.message });
  }
});

// Get all courses
router.get("/courses", 
    // authenticate, 
    async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
});

// Get a single course by ID
// router.get("/:id", authenticate, async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) return res.status(404).json({ message: "Course not found" });

//     res.status(200).json(course);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching course", error: error.message });
//   }
// });

// // Update a course (only instructors or admins)
// router.put("/:id", authenticate, authorize(["instructor", "admin"]), async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) return res.status(404).json({ message: "Course not found" });

//     Object.assign(course, req.body);
//     await course.save();

//     res.status(200).json({ message: "Course updated successfully", course });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating course", error: error.message });
//   }
// });

// // Delete a course (only instructors or admins)
// router.delete("/:id", authenticate, authorize(["instructor", "admin"]), async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) return res.status(404).json({ message: "Course not found" });

//     await course.deleteOne();
//     res.status(200).json({ message: "Course deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting course", error: error.message });
//   }
// });

module.exports = router;
