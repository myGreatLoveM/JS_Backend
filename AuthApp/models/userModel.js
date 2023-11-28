const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    trim: true,
  },
  user_email: {
    type: String,
    required: true,
    trim: true,
  },
  user_password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['admin', 'student', 'other']
  }
})


module.exports = mongoose.model( 'User', userSchema )