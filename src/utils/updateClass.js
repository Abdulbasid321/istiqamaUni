const Class = require('../model/Class')



const updateClassWithStudents = async (classId, usersId) => {
    const classToUpdate = await Class.findById(classId);

    if (!classToUpdate) {
        console.error('Class not found:', classId);
        return;
    }
    classToUpdate.users.push(...usersId);
    await classToUpdate.save();
    console.log('Class updated with students:', classToUpdate);
};

handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { email: '', password: '' };
  
    if (err.code === 11000) {
      errors.email = 'this email has already been used';
      return errors;
    }
  
    if (err.message.includes('user validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(properties)
        errors[properties.path] = properties.message;
      });
      return errors;
    }
  }



module.exports = {updateClassWithStudents, handleErrors};