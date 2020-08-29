var express = require('express');
var router = express.Router();
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const upload = multer({
  dest: './public/images'
})

const directoryPath = path.join(__dirname, '..', 'public', 'images')

router.post('/', upload.single('file'), (req, res) => {
  res.json({ files: req.files })
});

router.get('/', (req, res) => {
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      res.status(500).send(`Unable to scan directory: ${err}`)
    } else {
    const filesSent = files.map(file => `images/${file}`)
    res.json(filesSent)
    }
  });
});

module.exports = router;
