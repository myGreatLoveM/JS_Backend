const express = require('express')
const app = express()
const dbConnect = require('./config/dbConnect')

require('dotenv').config()
const port = process.env.PORT || 5000

app.use(express.json())

app.use('/api/v1', require('./routes/blogRoutes'))

app.listen(port, () => {
  console.log(`------------------------------------------------------------------------------------------------------------`)
  console.log(`Server started successfull at port_number : ${port}`)
}) 
dbConnect()

app.get('/', (req, res) => {
  res.send('<h1>This is Homepage Bitch</h1>')
})

