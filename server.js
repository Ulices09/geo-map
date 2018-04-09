var express = require('express')
var path = require('path')

var app = express()
var server = require('http').Server(app)
var io = require('./controllers/socket').listen(server)

app.use('/js', express.static(path.join(__dirname, '/public/js')))
app.use('/css', express.static(path.join(__dirname, '/public/css')))

//controllers
var home = require('./controllers/home')
var realtime = require('./controllers/realtime')
var navigation = require('./controllers/navigation')
var search = require('./controllers/search')
var datasets = require('./controllers/datasets')

app.use(home)
app.use(realtime)
app.use(navigation)
app.use(search)
app.use(datasets)

//Page not found
// app.get('*', function(req, res){
//     res.send('what???', 404);
// });

server.listen(3000, () => {
    console.log("Server listening in localhost:3000")
})