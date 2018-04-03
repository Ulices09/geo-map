var socket
var room

$(document).ready(function() {
    room = getQueryStringValue("r")

    socket = io.connect('http://localhost:3000', {'forceNew': true})

    socket.on('connect', function() {
        socket.emit('connect-room', room)
    })

    socket.on('from-main', function(data) {
        console.log(data)
    })
});

document.querySelector('#toMain').addEventListener('click', function() {
    socket.emit('to-main', {
        room: room,
        data: {
            message: 'desde details'
        }
    })
})