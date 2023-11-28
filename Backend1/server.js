// Server Instantiate / Created
const express = require('express')
const app = express()

// Middleware
// use for parsing req.body in express -> Put & Post
const bodyParser = require('body-parser')
// Specifically parse JSON data & add it to request.body object
app.use(bodyParser.json())

/**  Activated the Server & 
  Server live on 3000 port on Local Machine **/
app.listen(3000, () => {
  console.log('Server started at port no. 3000')
})

const mongoose = require('mongoose')
//127.0.0.1:27017/myDataBase
mongodb: mongoose
  .connect('mongodb://127.0.0.1:27017/myDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connection established')
  })
  .catch((err) => {
    console.log('Error received')
  })

// Routes
app.get('/', (request, response) => {
  response.send('Hi Prem')
})

app.post('/api/cars', (request, response) => {
  const { name, brand } = request.body
  console.log(name)
  console.log(brand)
  response.send('Car submitted successfully')
})

