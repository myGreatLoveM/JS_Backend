const express = require('express')
const router = express.Router()
const {
  imgUpload,
  vidUpload,
  reducedImgUpload,
  localFileUpload,
} = require('../controllers/fileUploadController')


// router.post('/imgUpload', imgUpload)

// router.post('/vidUpload', vidUpload)

// router.post('/imgRedUpload', reducedImgUpload)

router.post('/localFileUpload', localFileUpload)



module.exports = router