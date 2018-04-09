var express = require('express')
var path = require('path')

var app =  module.exports = express()

app.use('/datasets/js', express.static(path.join(__dirname, '..', '/public/views/datasets/js')))
app.use('/datasets/css', express.static(path.join(__dirname, '..', '/public/views/datasets/css')))
const view_path = path.join(__dirname, '..', '/public/views/datasets')

app.get('/datasets/main', function(req, res) {
    res.sendFile(path.join(view_path, '/main.html'))
})

app.get('/datasets/detail', function(req, res) {
    res.sendFile(path.join(view_path, '/detail.html'))
})

app.get('/datasets/datalist', function(req, res) {
    res.sendFile(path.join(view_path, '/datalist.html'))
})