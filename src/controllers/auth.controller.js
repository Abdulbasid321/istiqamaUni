const User = require('../model/User')

module.exports.login = async (req, res) => {

    const { email, password } = req.body;
  
    try {
      const user = await User.login(email, password)
      res.status(200).json({ user: user })
    } catch (err) {
      res.status(400).json({})
    }
  }
  
