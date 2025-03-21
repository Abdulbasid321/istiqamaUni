// const { string, required } = require('joi');
const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({


    title: {
        type: String,
        required: [true, 'plaese enter the the title of your content'],
    },
    content: {
        type: String,
        required: [true, 'plaese write some content .....'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        // required: [true, 'plaese specify the student class'],
    },

});




const Blog = mongoose.model('blog', blogSchema);
module.exports = Blog;