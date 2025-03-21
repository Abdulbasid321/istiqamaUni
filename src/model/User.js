// const { string, required } = require('joi');
const mongoose = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'please enter the student firstName'],
        lowerCase: true,
    },
    sureName: {
        type: String,
        required: [true, 'please enter the student surName'],
        lowerCase: true,
    },
    
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

    currentClassId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class',
        required: [true, 'plaese specify the student class'],
    },

    classHistory: [
        {
          classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
        //   fromDate: Date,
        fromDate: {
            type: Date,
            default: Date.now
          },
          toDate: Date
        }
      ],
    // firstName: {
    //     type: String,
    //     required: [true, 'please enter the student firstName'],
    //     lowerCase: true,
    // },
    // sureName: {
    //     type: String,
    //     required: [true, 'please enter the student surName'],
    //     lowerCase: true,
    // },
    
    // email: {
    //     type: String,
    //     required: [true, 'plaese enter the student email email'],
    //     unique: true,
    //     lowerCase: true,
    //     validate: [isEmail, 'please enter a valid email']
    // },

    // password: {
    //     type: String,
    //     required: [true, 'please enter your password'],
    //     minlength: [6, 'the minimun length for password is 6 characters'],
    // },

    // classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class',
    //     required: [true, 'plaese specify the student class'],
    // },
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
});


userSchema.statics.login = async function (email, password) {
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


const User = mongoose.model('user', userSchema);
module.exports = User;