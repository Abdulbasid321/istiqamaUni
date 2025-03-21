const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    mediaType: {
        type: String,
        required: true,
        enum: ['image/jpeg', 'image/png', 'video/mp4'], // Restrict to images and videos only
    },
    // mediaData: {
    //     type: Buffer,
    //     required: true,
    // },

    mediaUrl: {
        type: String, // URL from Cloudinary
        required: true,
      },
    mediaName: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    }
});

const Gallery = mongoose.model('Gallery', gallerySchema);
module.exports = Gallery;
