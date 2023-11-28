const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.authN =  (req, res, next) => {
  try {
    console.log('Cookie : ', req.cookies)
    console.log('Body : ', req.body)
    console.log('Header : ', req.header('Authorization'))

    const token =
      req.cookies.tokenCookie ||
      req.body.token ||
      req.header('Authorization').replace('Bearer ', '')

    if (!token || token === undefined) {
      return res.status(401).json({
        success: false,
        message: 'Token missing from request',
      })
    }

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
      req.authNuser = decodedToken
    } catch (err) {
      console.log(err)
      console.log('Invalid token')
      return req.status(401).json({
        success: false,
        data: token,
        message: 'Invalid token',
      })
    }

    next()
  } catch (err) {
    return req.status(500).json({
      success: false,
      error: err.message,
      message: 'Something went wrong while verifying token'
    })
  }
  
}

exports.isStudent = (req, res, next) => {
  if (req.authNuser.role !== 'student') {
    return res.status(403).json({
      success: false,
      message: 'User is not authorized to access student dashboard',
    })
  }
  next()
}

exports.isAdmin = (req, res, next) => {
  if (req.authNuser.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'User is not authorized to access admin dashboard',
    })
  }
  next()
}
