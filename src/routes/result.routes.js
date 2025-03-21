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

router.get('/getResults/:userId', async (req, res) => {
  try {
      const { userId } = req.params;

      const results = await Result.find({ user: userId })
          .select('-fileData') 
          .populate('classId', 'name');

      res.status(200).json({ message: 'Results fetched successfully', results });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});



router.get('/downloadResult/:fileId', async (req, res) => {
    try {
        const { fileId } = req.params;
        const result = await Result.findById(fileId);
        if (!result) {
            return res.status(404).json({ error: 'Result not found' });
        }
        res.set({ 
            'Content-Type': result.fileType,
            'Content-Dispnpmosition': `attachment; filename=${result.fileName}`,
        });
        res.send(result.fileData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

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


module.exports = router;


