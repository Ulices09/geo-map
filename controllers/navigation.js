var express = require('express')
var path = require('path')

var app =  module.exports = express()

app.use('/navigation/js', express.static(path.join(__dirname, '..', '/public/views/navigation/js')))
app.use('/navigation/css', express.static(path.join(__dirname, '..', '/public/views/navigation/css')))
const view_path = path.join(__dirname, '..', '/public/views/navigation')

app.get('/navigation/main', function(req, res) {
    res.sendFile(path.join(view_path, '/main.html'))
})

app.get('/navigation/detail', function(req, res) {
    res.sendFile(path.join(view_path, '/detail.html'))
})

app.get('/navigation/datalist', function(req, res) {
    res.sendFile(path.join(view_path, '/datalist.html'))
})