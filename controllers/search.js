var express = require('express')
var path = require('path')

var app =  module.exports = express()

app.use('/search/js', express.static(path.join(__dirname, '..', '/public/views/search/js')))
app.use('/search/css', express.static(path.join(__dirname, '..', '/public/views/search/css')))
const view_path = path.join(__dirname, '..', '/public/views/search')

app.get('/search/main', function(req, res) {
    res.sendFile(path.join(view_path, '/main.html'))
})

app.get('/search/detail', function(req, res) {
    res.sendFile(path.join(view_path, '/detail.html'))
})

app.get('/search/datalist', function(req, res) {
    res.sendFile(path.join(view_path, '/datalist.html'))
})