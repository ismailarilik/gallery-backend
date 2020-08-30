var express = require('express')
var router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const upload = multer({
  // The directory for uploaded images
  dest: './public/images'
})

const directoryPath = path.join(__dirname, '..', 'public', 'images')

// POST to /images to upload images
router.post('/', upload.single('file'), (req, res) => {
  res.json(req.file)
})

// GET to /images to get an array of images
router.get('/', (_, res) => {
  fs.readdir(directoryPath, function (err, files) {
    // Handle errors
    if (err) {
      console.log(`Unable to scan directory: ${err}`)
      res.status(500).send(`Unable to scan directory: ${err}`)
    } else {
      // Sent image names
      res.json(files)
    }
  })
})

module.exports = router
