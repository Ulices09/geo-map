//var MAIN_SOCKET_ID = ''
//var DATASETS_SOCKET_ID = ''
var socket
var room

$(document).ready(function() {
    room = getQueryStringValue("r")

    socket = io.connect('http://localhost:3000', {'forceNew': true})

    socket.on('connect', function() {
        socket.emit('connect-room', room)
    })
});



document.querySelector('#datasetsToMain').addEventListener('click', function() {
    socket.emit('to-main', {
        room: room,
        data: {
            message: 'Hola como esta pex'
        }
    })
})