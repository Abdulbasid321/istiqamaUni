const { Router } = require('express');
const router = Router();
const studentController = require('../controllers/student.controller')
const multer = require('multer');
const Student = require('../model/student')

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });


router.post('/students',
    // adminAuth.authenticate('jwt', { session: false }),
    studentController.create)
    router.post('/students', upload.single('profilePic'), studentController.create);
router.get('/students/:id',
    // adminAuth.authenticate('jwt', { session: false }),
    studentController.getStudentById)
router.get('/students',
    // adminAuth.authenticate('jwt', { session: false }),
    studentController.getAll)
// router.put('/student/:id',
//     // adminAuth.authenticate('jwt', { session: false }),
//     studentController.update)
// router.delete('/student/:id',
//     // adminAuth.authenticate('jwt', { session: false }),
//     studentController.delete)
router.get('/stats', studentController.getStats);




router.put("/students/:id", async (req, res) => {
    try {
      const studentId = req.params.id;
      const updateData = req.body;
  
      const updatedStudent = await Student.findByIdAndUpdate(studentId, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation rules are applied
      });
  
      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      res.json({ message: "Profile updated successfully", updatedStudent });
    } catch (error) {
      res.status(500).json({ message: "Error updating profile", error: error.message });
    }
  });
  

module.exports = router;




