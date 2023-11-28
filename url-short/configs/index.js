const mongoose = require('mongoose')
require('dotenv').config()

const dbConnection = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/shortUrl', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Database connection established')
    console.log('------------------------------------------------------------')
  } catch (error) {
    console.log('Internal server error while connecting to database')
    process.exit(1)
  }
}

module.exports = {
  dbConnection
}
