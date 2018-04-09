var express = require('express')
var path = require('path')

var app =  module.exports = express()

app.use('/realtime/js', express.static(path.join(__dirname, '..', '/public/views/realtime/js')))
app.use('/realtime/css', express.static(path.join(__dirname, '..', '/public/views/realtime/css')))
const view_path = path.join(__dirname, '..', '/public/views/realtime')

app.get('/realtime/main', function(req, res) {
    res.sendFile(path.join(view_path, '/main.html'))
})

app.get('/realtime/detail', function(req, res) {
    res.sendFile(path.join(view_path, '/detail.html'))
})

app.get('/realtime/datalist', function(req, res) {
    res.sendFile(path.join(view_path, '/datalist.html'))
})