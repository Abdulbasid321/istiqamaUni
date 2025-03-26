// const Result = require('../model/Result');
// const upload = require('../middleware/multerConfig');
 
//  module.exports.getOne = async (req, res) => {
//     try {
//       const { user, classId } = req.body;
//       const file = req.file;
  
//       if (!file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//       }
  
//       const newResult = new Result({
//           user: user,
//         classId: classId,
//         fileData: file.buffer,
//         fileType: file.mimetype,
//         fileName: file.originalname
//       });     
//       await newResult.save();
  
//       res.status(201).json({ message: 'Result uploaded successfully', result: newResult });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   }

const Result = require("../model/Result");
const User = require("../model/student");
const Department = require("../model/Course"); // Assuming you have a Department model

module.exports.getResults = async (req, res) => {
  try {
    const { userId } = req.params;

    const results = await Result.find({ user: userId })
      .populate("user", "username") // Replace user ID with username
      .populate("classId", "name"); // Replace classId with department name

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
