//  Connection ensure b/w application and database 

const mongoose = require('mongoose')

// load envVar into process object 
require('dotenv').config()

// Establish connection between database and application
// wrap in dbConnect function
const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Database connection established'))
    .catch((error) => {
        console.log('Issue while connecting to database')
        console.log(error.message)
        process.exit(1)
    })
}

module.export = dbConnect