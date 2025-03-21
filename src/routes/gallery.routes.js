const express = require('express');
const multer = require('multer');
const { storage } = require('../../src/utils/clodinaryConfig'); // Adjust path as needed
// const upload = multer({ storage });
const Gallery = require('../model/Gallery');
const { cloudinary } = require('../../src/utils/clodinaryConfig'); // Adjust the path if needed


const router = express.Router();

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 50 * 1024 * 1024, // 50MB limit
//   },
// });
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image or video!'), false);
    }
  }
});


// Route to upload media
// router.post('/uploadMedia', upload.single('media'), async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const { mimetype, originalname } = req.file;

//     // Create a new Gallery item
//     const mediaItem = new Gallery({
//       title,
//       description,
//       mediaType: mimetype,
//       mediaName: originalname,
//       mediaUrl: req.file.secure_url,
//     });

//     await mediaItem.save();

//     res.status(201).json({ message: 'Media uploaded successfully', mediaItem });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
router.post('/uploadMedia', upload.single('media'), async (req, res) => {
  try {

    console.log('Upload Response:', req.file);

    if (!req.file) {
      return res.status(400).json({ error: 'File upload failed. Please try again.' });
    }

    const { title, description } = req.body;
    const { mimetype, originalname, path } = req.file;

    // Ensure that `path` is available
    if (!path) {
      return res.status(400).json({ error: 'Media URL not found in upload response.' });
    }

    // Create a new Gallery item
    const mediaItem = new Gallery({
      title,
      description,
      mediaType: mimetype,
      mediaName: originalname,
      mediaUrl: path, // Use the path property for the Cloudinary URL
    });

    await mediaItem.save();

    res.status(201).json({ message: 'Media uploaded successfully', mediaItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Route to get all media metadata
router.get('/getAllMedia', async (req, res) => {
  try {
    const galleryItems = await Gallery.find().select('-__v');
    res.status(200).json(galleryItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to serve media files
router.get('/media/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const mediaItem = await Gallery.findOne({ mediaName: filename });
    if (!mediaItem) {
      return res.status(404).json({ message: 'Media not found' });
    }

    res.redirect(mediaItem.mediaUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete media by ID
router.delete('/deleteMedia/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the media item in the database
    const mediaItem = await Gallery.findById(id);
    if (!mediaItem) {
      return res.status(404).json({ message: 'Media not found' });
    }

    // Ensure mediaName is defined
    if (!mediaItem.mediaName) {
      return res.status(400).json({ error: 'MediaName is not defined for this item' });
    }

    // Extract public ID from mediaName
    const publicId = mediaItem.mediaName.split('/').pop().split('.')[0]; // Extract public ID

    // Delete the media from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete the media item from the database
    await Gallery.findByIdAndDelete(id);

    res.status(200).json({ message: 'Media deleted successfully' });
  } catch (err) {
    console.error('Error deleting media:', err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;

