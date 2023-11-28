const express = require('express')
const router = express.Router()
const {
  generateNewShortUrl,
  openShortUrl,
  getAnalyticsOfUrl,
  getAllUrls,
} = require('../controllers/urlControllers')

router.get('/', getAllUrls)

router.post('/url', generateNewShortUrl)

router.get('/:shortUrl', openShortUrl)

router.get('/url/analytics/:shortUrl', getAnalyticsOfUrl)


module.exports = router