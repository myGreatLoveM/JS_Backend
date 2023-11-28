const mongoose = require('mongoose')
require('dotenv').config()

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Database connection established successfully')
        console.log('------------------------------------------')
    } catch (err) {
        console.log(err)
        console.log('Internal server error while connecting to the database')
        process.exit(1)
    }
}

module.exports = dbConnect