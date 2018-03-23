var socket_io = require('socket.io')

module.exports.listen = function(server) {
    io = socket_io.listen(server)

    io.on('connection', (socket) => {
        console.log(`Se ha conectado el cliente ${socket.id}`)


        socket.on('test-id', (data) => {
            console.log(data)
        })

    })


    return io
}