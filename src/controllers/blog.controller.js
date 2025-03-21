const Blog = require('../model/Blog')


module.exports.create = async (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required.' });
    }

    try {
        const newBlog = await Blog.create({ title, content, author });
        res.status(201).json({ message: 'Blog created successfully', newBlog });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports.getAll = async (req, res) => {
    try {
        const blogs = await Blog.find(); // Retrieve all blogs

        if (blogs.length === 0) {
            return res.status(404).json({ message: 'No blogs found' });
        }

        res.status(200).json({ message: 'Blogs retrieved successfully', blogs });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports.update = async (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, content, author },
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog updated successfully', updatedBlog });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


module.exports.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog deleted successfully', deletedBlog });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
