var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const multer = require('multer')
const cors = require('cors');

var app = express()

const upload = multer({
  dest: './public/images'
})
app.use(cors());
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ files: req.files })
});
module.exports = app
