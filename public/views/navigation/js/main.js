var room

$(document).ready(function() {
    room = getQueryStringValue("r")
    
    socket = io.connect('http://localhost:3000', {'forceNew': true})

    socket.on('connect', function() {
        socket.emit('connect-room', room)
    })

    socket.on('nlp-response', function(data) {
        console.log(data)
    })

    responsiveVoice.setDefaultVoice("Spanish Latin American Female");
    annyang.setLanguage('es-PE');

    annyang.addCallback('result', function(whatWasHeardArray) {
        console.log(whatWasHeardArray)

        socket.emit('process-text-nlp', {
            room: room,
            data: { text: whatWasHeardArray[0] }
        })
    });

    annyang.start();
});

document.querySelector('#realtime-section').addEventListener('click', function() {
    goToPage('realtime', socket, room)
})

document.querySelector('#search-section').addEventListener('click', function() {
    goToPage('search', socket, room)
})

document.querySelector('#datasets-section').addEventListener('click', function() {
    goToPage('datasets', socket, room)
})