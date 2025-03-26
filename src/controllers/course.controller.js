// const express = require("express");
// const Course = require("../models/courseModel");
// const { authenticate, authorize } = require("../middleware/auth"); // Middleware for auth

// const router = express.Router();

// // Create a new course (only instructors)
// router.post("/", 
//     authenticate, authorize(["instructor", "admin"]), async (req, res) => {
//   try {
//     const { title, description, price, duration, level } = req.body;
//     const instructorId = req.user.id; // Extract from token

//     const newCourse = new Course({
//       title,
//       description,
//       price,
//       duration,
//       level,
//       instructorId,
//     });

//     await newCourse.save();
//     res.status(201).json({ message: "Course created successfully", course: newCourse });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating course", error: error.message });
//   }
// });

// // Get all courses (only published for students, all for instructors/admins)
// router.get("/", authenticate, async (req, res) => {
//   try {
//     const filter = req.user.role === "student" ? { isPublished: true } : {};
//     const courses = await Course.find(filter).populate("instructorId", "name email");

//     res.status(200).json(courses);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching courses", error: error.message });
//   }
// });

// // Get a single course by ID
// router.get("/:id", authenticate, async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id).populate("instructorId", "name email");
//     if (!course) return res.status(404).json({ message: "Course not found" });

//     // Only allow students to access published courses
//     if (req.user.role === "student" && !course.isPublished) {
//       return res.status(403).json({ message: "Unauthorized to view this course" });
//     }

//     res.status(200).json(course);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching course", error: error.message });
//   }
// });

// // Update a course (only the instructor or admin)
// router.put("/:id", authenticate, authorize(["instructor", "admin"]), async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) return res.status(404).json({ message: "Course not found" });

//     // Check if the logged-in instructor owns the course
//     if (req.user.role === "instructor" && course.instructorId.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Unauthorized to update this course" });
//     }

//     Object.assign(course, req.body);
//     await course.save();

//     res.status(200).json({ message: "Course updated successfully", course });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating course", error: error.message });
//   }
// });

// // Delete a course (only the instructor or admin)
// router.delete("/:id", authenticate, authorize(["instructor", "admin"]), async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) return res.status(404).json({ message: "Course not found" });

//     // Check if the logged-in instructor owns the course
//     if (req.user.role === "instructor" && course.instructorId.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Unauthorized to delete this course" });
//     }

//     await course.deleteOne();
//     res.status(200).json({ message: "Course deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting course", error: error.message });
//   }
// });

// module.exports = router;
