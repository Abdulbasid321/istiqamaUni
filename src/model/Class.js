const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    
});


const Class = mongoose.model('class', classSchema);
module.exports = Class;