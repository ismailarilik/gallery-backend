var express = require('express')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const path = require('path')
const cors = require('cors');

var imagesRouter = require('./routes/images');

var app = express()

app.use(cors());
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/images', imagesRouter);

module.exports = app
