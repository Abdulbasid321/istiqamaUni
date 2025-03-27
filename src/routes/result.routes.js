const { Router } = require('express');
const Result = require('../model/Result');
const upload = require('../middleware/multerConfig');
const passport = require('../middleware/passport');

const router = Router();

router.post('/uploadResult', upload.single('result'), async (req, res) => {
  try {
    const { user, classId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const newResult = new Result({
        user: user,
      classId: classId,
      fileData: file.buffer,
      fileType: file.mimetype,
      fileName: file.originalname
    });     
    await newResult.save();

    res.status(201).json({ message: 'Result uploaded successfully', result: newResult });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// router.get('/getResults/:userId', async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const results = await Result.find({ user: userId }).select('-fileData'); // this one Excludes the file data
//         res.status(200).json({ message: 'Results fetched successfully', results });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// router.get('/getResults/:userId', async (req, res) => {
//   try {
//       const { userId } = req.params;

//       const results = await Result.find({ user: userId })
//           .select('-fileData') 
//           .populate('classId', 'name');

//       res.status(200).json({ message: 'Results fetched successfully', results });
//   } catch (err) {
//       res.status(500).json({ error: err.message });
//   }
// });



// router.get('/downloadResult/:fileId', async (req, res) => {
//     try {
//         const { fileId } = req.params;
//         const result = await Result.findById(fileId);
//         if (!result) {
//             return res.status(404).json({ error: 'Result not found' });
//         }
//         res.set({ 
//             'Content-Type': result.fileType,
//             'Content-Dispnpmosition': `attachment; filename=${result.fileName}`,
//         });
//         res.send(result.fileData);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

router.delete = async (req, res) => {
  const id = req.params;

  try {
      const resultExist = await Result.findById(fileId);
      if (!resultExist) {
          return res.status(404).json({ message: "Result doesn't exist" });
      }

      await Result.findByIdAndDelete(id);
      res.status(200).json({ message: "Result deleted successfully" });
  } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
  }
};


// Add a new student result
router.post("/addResult", async (req, res) => {
  try {
    const { regNumber, course, grade } = req.body;
    if (!regNumber || !course || !grade) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newResult = new Result({ regNumber, course, grade });
    await newResult.save();
    res.status(201).json({ message: "Result added successfully", result: newResult });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get results for a student by regNumber
// router.get("/getResults/:regNumber", async (req, res) => {
//   try {
//     const { regNumber } = req.params;
//     const results = await Result.find({ regNumber });
//     if (results.length === 0) {
//       return res.status(404).json({ message: "No results found for this student" });
//     }
//     res.json(results);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

router.get("/getResults/:regNumber", async (req, res) => {
  try {
    const { regNumber } = req.params;
    console.log("🔍 Received regNumber:", regNumber);

    const results = await Result.find({ regNumber: { $regex: new RegExp(`^${regNumber}$`, "i") } });
    console.log("🔍 Query results:", results);

    if (!results.length) {
      console.log("⚠️ No results found for:", regNumber);
      return res.status(200).json({ message: "No results found", results: [] });
    }

    res.status(200).json({ message: "Results fetched successfully", results });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});




module.exports = router;


