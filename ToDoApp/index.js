const express = require('express')
const app = express()
const dbConnect = require('./config/dbConnection')
require('dotenv').config()

const port = process.env.PORT || 5000

// middleware to parse the data in JSON format in req.body
app.use(express.json())

// route mouting with directory hierarchy
app.use('/api/v1', require('./routes/toDoRoute')) 

// server live on port
app.listen(port, () => {
    console.log('------------------------------------------------------------------------------------------------------------')
    console.log(`Server started successfull at port_number : ${port}`)
}) 
dbConnect()  // db connection

// default route
app.get('/', (req, res) => {
    res.send(`<h1>This is Homepage Baby!!</h1>`)
})