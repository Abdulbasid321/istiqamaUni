// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// cloudinary.config({
//   cloud_name: process.env.cloud_name,
//   api_key: process.env.api_key,
//   api_secret: process.env.api_secret,
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'media', // Folder name in Cloudinary
//     allowed_formats: ['jpeg', 'jpg', 'png', 'mp4'], // Allowed file formats
//   },
// });

// module.exports = { cloudinary, storage };
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "dg1hrifnk",
  api_key:    "364159795788712",
  api_secret: "vW2G-Yt6aNJ35Kq2hXfQx7ZAj7o"
});

module.exports = cloudinary;
