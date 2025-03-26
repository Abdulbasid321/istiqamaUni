const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the student\'s name'],
    },
    regNumber: {
        type: String,
        required: [true, 'Please provide the registration number'],
        unique: true
    },
    department: {
        type: String,
        required: [true, 'Please specify the department'],
    },
    level: {
        type: String,
        required: [true, 'Please specify the student\'s level'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Please enter a phone number'],
    },
    address: {
        type: String,
        required: [true, 'Please enter an address'],
    },
    feesPaid: {
        type: Boolean,
        default: false
    },
    profilePic: {
        type: String,
        default: 'https://randomuser.me/api/portraits/men/1.jpg' // Placeholder image
    }
}, { timestamps: true });


// **Hash password before saving**
// studentSchema.pre('save', async function (next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.regNumber, salt);
//     next();
//   });
  
//   // **Login function**
//   studentSchema.statics.login = async function (email, regNumber) {
//     const student = await this.findOne({ email });
  
//     if (student) {
//       const auth = await bcrypt.compare(regNumber, student.regNumber);
//       if (auth) {
//         return student;
//       }
//       throw Error('Incorrect password');
//     }
//     throw Error('Incorrect email');
//   };
  
studentSchema.statics.login = async function (email, regNumber) {
    const student = await this.findOne({ email });

    if (student) {
        if (regNumber === student.regNumber) { // Plain text comparison
            return student;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
};

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
