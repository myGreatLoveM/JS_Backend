const express = require('express')
const app = express()
const dbConnect = require('./configs/dbConnect')
const cloudinaryConnect = require('./configs/cloudinary')
const fileUpload = require('express-fileupload')
const fileUploadRoutes = require('./routes/fileUploadRoutes')
require('dotenv').config()



const port = process.env.PORT || 3000


app.use(express.json())

app.use(fileUpload())

app.use('/api/v1/upload', fileUploadRoutes)


app.listen(port, () => {
  console.log('-------------------------------------------------')
  console.log('App is running at port_no : ', port)
})
dbConnect()
cloudinaryConnect()


//
app.get('/', (req, res) => {
    return res.send('<h1>Welcome to HomePage Bitch!!</h1>')
})