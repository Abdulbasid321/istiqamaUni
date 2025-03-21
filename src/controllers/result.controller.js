const Result = require('../model/Result');
const upload = require('../middleware/multerConfig');
 
 module.exports.getOne = async (req, res) => {
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
  }