const express = require('express')
const app = express()
const path = require('path')
const {dbConnection} = require('./configs')
const urlRouter = require('./routes/urlRoutes')

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.json())

app.use('/', urlRouter)

const port = 8000 

app.listen(port, () => {
  console.log('------------------------------------------------------------')
  console.log(`Server started listening on port_no : ${port}`)
})
dbConnection()

app.get('/', (req, res) => {
    res.end('<h1>Welcome to HomePage Bitch</h1>')
})


