const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.signUp = async (req, res) => {
  try {
    const { user_name, user_email, user_password, role } = req.body

    if (!user_name || !user_email || !user_password || !role) {
      return res.status(400).json({
        success: false,
        data: req.body,
        message: 'Please provide all required fields',
      })
    }

    const existingUser = await User.findOne({ user_email })
    if (existingUser) {
      console.log('User already exists, please try login ...')
      return res.status(400).json({
        success: false,
        data: {
          user_name: existingUser.user_name,
          user_email: existingUser.user_email,
        },
        message: 'User already exists, please try login ...',
      })
    }

    let hashedPassword
    try {
      hashedPassword = await bcrypt.hash(user_password, 10)
    } catch (err) {
      console.log('Error occured while hashing password')
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Internal Server error, please try again later',
      })
    }

    const user = new User({
      user_name,
      user_email,
      user_password: hashedPassword,
      role,
    })
    await user.save()

    console.log('A new user registered successfully')
    return res.status(201).json({
      success: true,
      data: {
        user_name,
        user_email,
        role,
      },
      message: 'A new user registered successfully',
    })
  } catch (err) {
    console.log(err)
    console.log('----------------------------------------------------')
    console.log(err.message)
    console.log(
      'An error occurred while registering a new user, please try again later'
    )

    return res.status(500).json({
      success: false,
      data: null,
      message:
        'An error occurred while registering a new user, please try again later',
    })
  }
}

exports.logIn = async (req, res) => {
  try {
    const { user_email, user_password } = req.body

    if (!user_email && !user_password) {
      console.log('Please provide all credentials to login')
      return res.status(400).json({
        success: false,
        message: 'Please provide all credentials to login',
      })
    } else if (!user_email) {
      console.log('Please provide an email address to login')
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address to login',
      })
    } else if (!user_password) {
      console.log('Please provide a password to login')
      return res.status(400).json({
        success: false,
        message: 'Please provide a password to login',
      })
    }

    const existingUser = await User.findOne({ user_email })
    if (!existingUser) {
      console.log('No such user found registered , please signup first')
      return res.status(401).json({
        success: false,
        data: null,
        message: 'No such user found registered ,please signup first',
      })
    }

    const passwordVerified = await bcrypt.compare(
      user_password,
      existingUser.user_password
    )
    if (passwordVerified) {
      const payload = {
        id: existingUser._id,
        user_email: existingUser.user_email,
        role: existingUser.role,
      }
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '2hr',
      })
      const authenticatedUser = {
        token: token,
        user_name: existingUser.user_name,
        user_email: existingUser.user_email,
        role: existingUser.role,
      }
      const cookieOptions = {
        expires: new Date(Date.now()+ 30000),
        httpOnly: true,
      }

      console.log('User logged in successfully')
      return res.cookie('tokenCookie', token, cookieOptions).status(200).json({
        success: true,
        token,
        authenticatedUser,
        message: 'User logged in successfully',
      })
      
    } 
    else {
      console.log('Password Incorrect, please try again with valid password')
      return res.status(403).json({
        success: false,
        data: user_email,
        message: 'Password Incorrect, please try again with valid password',
      })
    }
  } 
  catch (err) {
    console.log(err)
    console.log('Could not login! Please try again later...')

    return res.status(500).json({
        success: false,
        data: req.body,
        message: 'Could not login! Please try again later...'
    })
  }
}
