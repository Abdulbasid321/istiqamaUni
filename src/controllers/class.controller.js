const Class = require('../model/Class')
const User = require('../model/User')

module.exports.create = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newClass = await Class.create({ name, description });
        res.status(201).json(newClass);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


// get All sudent base on class
module.exports.getAllClassStudent = async (req, res) => {
    try {
        const { classId } = req.params;
        const users = await User.find({ currentClassId: classId });
        res.status(200).json({ users: users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.getAll = async (req, res) => {
    try {
        const clases = await Class.find();
        res.status(200).json({ classes: clases });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.getOne = async (req, res) => {
    const id = req.params.id;
    try {
        const clases = await Class.findById(id);
        if (!clases) {
            return res.status(400).json({ error: 'clases not found' });
        }
        res.status(200).json({ user: clases })
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
}

module.exports.update = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        const classExist = await Class.findById(id);
        if (!classExist) {
            return res.status(404).json({ message: "class doesn't exist" });
        }

        const classes = await Class.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        res.status(200).json({ user: classes });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};



module.exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const classExist = await User.findById(id);
        if (!classExist) {
            return res.status(404).json({ message: "class doesn't exist" });
        }

        await Class.findByIdAndDelete(id);
        res.status(200).json({ message: "class deleted successfully" });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};



