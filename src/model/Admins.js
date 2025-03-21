// const { string, required } = require('joi');
const mongoose = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require('bcrypt');

const adminSchema = mongoose.Schema({
      
    email: {
        type: String,
        required: [true, 'plaese enter the student email email'],
        unique: true,
        lowerCase: true,
        validate: [isEmail, 'please enter a valid email']
    },

    password: {
        type: String,
        required: [true, 'please enter your password'],
        minlength: [6, 'the minimun length for password is 6 characters'],
    },

});

adminSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
});


adminSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });

    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}


const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;