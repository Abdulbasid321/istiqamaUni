const { Router } = require('express');
const router = Router();
const studentController = require('../controllers/student.controller')
const multer = require('multer');

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

module.exports = router;

