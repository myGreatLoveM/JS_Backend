// Server Instantiate
// instance of express
const express = require('express')

// single instance of express
const app = express()

// connection build between server.js and mongodb
const mongoose = require('mongoose')

mongoose
  .connect('mongodb://127.0.0.1:27017/myDataBase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connection Successfully established')
  })
  .catch((error) => {
    console.log(error)
  })

// activate the server on 3000
// server listen on port 3000 for Get request
app.listen(3000, () => {
  console.log('Server started at port no. 3000')
})

// body-parser object
// used to parse req.body in express -> PUT or POST
const bodyParser = require('body-parser')
// power up server with bodyParser object
// specifically parse json data & add it to the request.body object
app.use(bodyParser.json())

// Routes
// first route and response
app.get('/', (request, response) => {
  response.send('Your first Get Request')
})

app.get('/contact', (request, response) => {
  response.send('Your second Get Request')
})

app.post('/api/cars', (request, response) => {
  const { name, brand } = request.body
  console.log(name)
  console.log(brand)
  response.send('Car submitted successfully')
})
