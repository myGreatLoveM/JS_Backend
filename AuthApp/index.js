const express = require('express')
const app = express()
const dbConnect = require('./config/dbConnect')
const userRoutes = require('./routes/userRoutes')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const port = process.env.PORT || 5000

app.use(cookieParser())

app.use(express.json())

app.use('/api/v1', userRoutes)

app.listen(port, () => {
    console.log('------------------------------------------')
    console.log('App started running on port : ' + port)
})
dbConnect()


app.get('/', (req, res) => {
    return res.send('<h1>Welcome to Homepage Bitch!</h1>')
})
