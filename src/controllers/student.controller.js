const Student = require('../model/student')
const Course = require('../model/Course')
const jwt = require('jsonwebtoken');


// module.exports.create = async (req, res) => {
//     const { name, regNumber, department, level, email, phone, address, feesPaid, profilePic } = req.body;

//     if (!name || !regNumber || !department || !level || !email || !phone || !address) {
//         return res.status(400).json({ error: 'All fields except profilePic are required.' });
//     }

//     try {
//         const newStudent = await Student.create({ 
//             name, 
//             regNumber, 
//             department, 
//             level, 
//             email, 
//             phone, 
//             address, 
//             feesPaid: feesPaid || false, // Default to false if not provided
//             profilePic: profilePic || 'https://randomuser.me/api/portraits/men/1.jpg' // Default profile picture
//         });

//         res.status(201).json({ message: 'Student created successfully', newStudent });
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };


module.exports.create = async (req, res) => {
    console.log("📥 Received Data:", req.body);  // Debugging log

    const { name, regNumber, department, level, email, phone, address, feesPaid, profilePic } = req.body;

    if (!name || !regNumber || !department || !level || !email || !phone || !address) {
        return res.status(400).json({ error: 'All fields except profilePic are required.' });
    }

    try {
        const newStudent = await Student.create({ 
            name, 
            regNumber, 
            department, 
            level, 
            email, 
            phone, 
            address, 
            feesPaid: feesPaid === "on" || feesPaid === true,  // 🔥 Fix here
            profilePic: profilePic || null  
        });

        res.status(201).json({ message: 'Student created successfully', newStudent });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// Route with file upload
// router.post('/students', upload.single('profilePic'), studentController.create);



module.exports.getStats = async (req, res) => {
  try {
      const totalStudents = await Student.countDocuments();
      const totalDepartments = await Course.countDocuments(); // Count total departments

      res.status(200).json({
          totalStudents,
          totalDepartments
      });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

module.exports.getAll = async (req, res) => {
    try {
        const students = await Student.find(); // Retrieve all students

        if (students.length === 0) {
            return res.status(404).json({ message: 'No students found' });
        }

        res.status(200).json({ message: 'Students retrieved successfully', students });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id); // Fetch by ID

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student retrieved successfully', student });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports.login = async (req, res) => {
    const { email, regNumber } = req.body;
    try {
      const student = await Student.login(email, regNumber);
      const token = jwt.sign(
        {
          data: {
            id: student._id,
            email: student.email,
            regNumber: student.regNumber,
          },
        },
        process.env.JWT_SECRET || 'poiuytrewqasdfghjklmnbvcxz',
        { expiresIn: '24h' }
      );
      res.status(200).json({ student, token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };