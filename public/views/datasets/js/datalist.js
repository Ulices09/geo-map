var socket
var room

$(document).ready(function() {
    room = getQueryStringValue("r")

    socket = io.connect('http://localhost:3000', {'forceNew': true})

    socket.on('connect', function() {
        socket.emit('connect-room', room)
    })

    socket.on('redirect-to-realtime-section', function(payload) {
        window.location.href = 'http://localhost:3000/realtime/datalist?r=' + payload.room
    })

    socket.on('redirect-to-navigation-section', function(payload) {
        window.location.href = 'http://localhost:3000/navigation/datalist?r=' + payload.room
    })

    socket.on('redirect-to-search-section', function(payload) {
        window.location.href = 'http://localhost:3000/search/datalist?r=' + payload.room
    })    

});