var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const multer = require('multer')
const cors = require('cors');
const path = require('path')
const fs = require('fs')

var app = express()

const upload = multer({
  dest: './public/images'
})

const directoryPath = path.join(__dirname, 'public', 'images')

app.use(cors());
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ files: req.files })
});

app.get('/images', (req, res) => {
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    const filesSent = files.map(file => `images/${file}`)
    res.json(filesSent)
  });
});

module.exports = app
