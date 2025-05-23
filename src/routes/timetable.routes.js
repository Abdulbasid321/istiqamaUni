// const { Router } = require("express");
// const multer = require("multer");
// const cloudinary = require("../utils/clodinaryConfig");
// const Timetable = require("../model/Timetable");

// const router = Router();
// const upload = multer({ storage: multer.memoryStorage() });



// router.post("/upload-timetable", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ error: "No image uploaded" });

//     const result = await new Promise((resolve, reject) => {
//       cloudinary.uploader.upload_stream(
//         { folder: "timetables", resource_type: "image" },
//         (err, result) => (err ? reject(err) : resolve(result))
//       ).end(req.file.buffer);
//     });

//     const timetable = new Timetable({ imageUrl: result.secure_url });
//     await timetable.save();

//     res.status(201).json({ message: "Uploaded", timetable });
//   } catch (err) {
//     res.status(500).json({ error: "Upload failed" });
//   }
// });


const { Router } = require("express");
const multer = require("multer");
const cloudinary = require("../utils/clodinaryConfig");
const Result = require("../model/Result");
const Timetable = require("../model/Timetable");
const authenticateStudent = require("../middleware/authStudent");

const router = Router();

// Memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📌 Upload Result

router.post("/upload-timetable", upload.array("images", 10), async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadedTimetables = [];

    for (const file of files) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: "image", // timetable files are images
            folder: "timetables",   // store under timetables folder
            timeout: 60000,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        ).end(file.buffer);
      });

      const newTimetable = new Timetable({
        fileUrl: uploadResult.secure_url || uploadResult.url,
        publicId: uploadResult.public_id,
        fileName: file.originalname,
        fileType: file.mimetype,
      });

      await newTimetable.save();
      uploadedTimetables.push(newTimetable);
    }

    res.status(201).json({
      message: "✅ Timetables uploaded successfully",
      timetables: uploadedTimetables,
    });

  } catch (err) {
    console.error("Timetable upload error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/latest-timetable", async (req, res) => {
  try {
    const timetable = await Timetable.findOne().sort({ uploadedAt: -1 });
    if (!timetable) return res.status(404).json({ error: "No timetable found" });
    res.json({ timetable });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;