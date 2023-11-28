const URL = require('../models/urlModel')
const shortid = require('shortid')

const generateNewShortUrl = async (req, res) => {
  try {
    const body = req.body

    if (Object.keys(body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a Url',
      })
    }
    const shortID = shortid()

    const shortUrl = new URL({
      shortUrl: shortID,
      redirectUrl: body.url,
      visitHistory: [],
    })

    await shortUrl.save()

    return res.status(200).json({
      success: true,
      data: shortID,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    })
  }
}

const openShortUrl = async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl

    const {redirectUrl} = await URL.findOneAndUpdate(
      { shortUrl },
      {
        $push: {
          visitHistory: {
            timestamp: new Date(),
          },
        },
      }
    )
    console.log(redirectUrl)
    return res.redirect(redirectUrl)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    })
  }
}

const getAnalyticsOfUrl = async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl
    const url = await URL.findOne({ shortUrl })

    return res.status(200).json({
      success: true,
      data: url.visitHistory,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    })
  }
}

const getAllUrls = async (req, res) => {
  const allUrls = await URL.find({})
  return res.render('home')
}

module.exports = {
  generateNewShortUrl,
  openShortUrl,
  getAnalyticsOfUrl,
  getAllUrls,
}
