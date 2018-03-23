var express = require('express')

var app = express()
var server = require('http').Server(app)
var io = require('./controllers/socket').listen(server)

app.use(express.static( __dirname + '/public'))

app.get('/gg', (req, res) => {
    res.status(200).send('Server running!')
})

server.listen(3000, () => {
    console.log("Server listening in localhost:3000")
})