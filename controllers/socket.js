var socket_io = require('socket.io')

module.exports.listen = function(server) {
    io = socket_io.listen(server)

    io.on('connection', (socket) => {
        //console.log(`Se ha conectado el cliente ${socket.id}`)

        socket.on('connect-room', (room) => {
            socket.join(room)
            console.log('cliento connected to ' + room)
        })

        socket.on('to-main', (payload) => {
            io.sockets.in(payload.room).emit('from-datasets', payload.data)
        })

    })


    return io
}