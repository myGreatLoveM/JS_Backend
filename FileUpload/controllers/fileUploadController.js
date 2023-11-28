const File = require('../models/fileModel')

exports.localFileUpload = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      console.log('Local file not found to upload on server')
      return res.status(400).json({
        success: false,
        message: 'Local file not found to upload on server',
      })
    }
    const localFile = req.files.localFile
    console.log('file --> ', localFile)

    let path =
      __dirname +
      '/uploadedFiles/' +
      localFile.name.split('.')[0] +
      `.${localFile.name.split('.')[1]}`

    console.log('path --> ', path)

    localFile.mv(path, (err) => {
      if (err) {
        console.log('Error occured while uploading local file on server')
        return res.status(500).json({
          success: false,
          error: err.message,
          message: 'Error occured while uploading local file on server',
        })
      }
    })

    const dbEntryOfFile = new File({
      name: localFile.name.split('.')[0],
      imgUrl: path,
    })

    try {
      await dbEntryOfFile.save()
      console.log('DB entry created and saved successfully')
    } catch (err) {
      console.log('Error occured while creating db entry local file')
      return res.status(500).json({
        success: false,
        error: err.message,
        message: 'Error occured while creating db entry local file',
      })
    }

    return res.status(201).json({
      success: true,
      data: dbEntryOfFile,
      message: 'Local File uploaded successfully on the server',
    })
  } catch (err) {
    console.log(err)
    console.log('Internal Server Error occured while uploading the local file')
    return res.status(500).json({
      success: false,
      error: err.message,
      message: 'Internal Server Error occured while uploading the local file',
    })
  }
}
