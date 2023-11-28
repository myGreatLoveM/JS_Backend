const mongoose = require('mongoose')
require('dotenv').config()

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Database connection established')
    console.log('------------------------------------------------------------------------------------------------------------')
  } 
  catch (err) {
    console.log('Internal Server error while connecting to database')
    console.log(err.message)
    process.exit(1)
  }
}

module.exports = dbConnect
