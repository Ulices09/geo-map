var express = require('express')
var path = require('path')

var app =  module.exports = express()

app.use(express.static(path.join(__dirname, '..', '/public/views/home')))

app.get('/', function(req, res) {
    res.send('/index.html')
})