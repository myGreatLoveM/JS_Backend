const express = require('express')
const router = express.Router()
const { signUp, logIn } = require('../controllers/userAuthController')
const { authN, isStudent, isAdmin } = require('../middlewares/authMiddleware')

router.route('/signUp').post(signUp)

router.route('/logIn').post(logIn)

router.route('/student').get(authN, isStudent, (req, res) => {
  return res.json({
    success: true,
    message: 'Welcome to the Protected route for Student',
  })
})

router.route('/admin').get(authN, isAdmin, (req, res) => {
  return res.json({
    success: true,
    message: 'Welcome to the Protected route for Admin',
  })
})

module.exports = router
