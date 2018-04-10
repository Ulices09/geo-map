var room

$(document).ready(function() {
    room = getQueryStringValue("r")
    
    socket = io.connect('http://localhost:3000', {'forceNew': true})

    socket.on('connect', function() {
        socket.emit('connect-room', room)
    })

    socket.on('from-datasets', (data) => {
        console.log(data)
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

mapboxgl.accessToken = 'pk.eyJ1IjoidWxpY2VzMDkiLCJhIjoiY2o4Y2Z2MTlyMGFhNzJ4c2ZycDZ3dWw5OCJ9.kq1sP4Wv-S2ehS91swYGYg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [-77.0428174, -12.0463782],
    zoom: 12
});

// document.querySelector('#real-time-section').addEventListener('click', function() {
//     console.log('real time')
// })

document.querySelector('#search-section').addEventListener('click', function() {
    goToPage('search', socket, room)
})

document.querySelector('#navigation-section').addEventListener('click', function() {
    goToPage('navigation', socket, room)
})

document.querySelector('#datasets-section').addEventListener('click', function() {
    goToPage('datasets', socket, room)
})