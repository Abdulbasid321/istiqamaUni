const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'class',
        required: true,
    },
      fileData: { type: Buffer, required: true },
      fileType: { type: String, required: true },
      fileName: { type: String, required: true },

    uploadedAt: {
        type: Date,
        default: Date.now,
    }
});


const Result = mongoose.model('result', resultSchema);
module.exports = Result;