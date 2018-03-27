const room = generateGuid()
var socket

$(document).ready(function() {
    //$("#linkToDatasets").attr("href", "http://localhost:3000/datasets/index.html?r=" + room)
    window.open('http://localhost:3000/datasets/index.html?r=' + room, '_blank')
    window.open('http://localhost:3000/details/index.html?r=' + room, '_blank')

    socket = io.connect('http://localhost:3000', {'forceNew': true})

    socket.on('connect', function() {
        socket.emit('connect-room', room)
    })

    socket.on('from-datasets', (data) => {
        console.log(data)
    })
});

/*document.querySelector('#btnti').addEventListener('click', function() {
    socket.emit('to-details', {
        room: room,
        data: { message: 'from main' }
    })
})*/

document.querySelector('#rtl-section').addEventListener('click', function() {
    console.log('ggmi')
})

mapboxgl.accessToken = 'pk.eyJ1IjoidWxpY2VzMDkiLCJhIjoiY2o4Y2Z2MTlyMGFhNzJ4c2ZycDZ3dWw5OCJ9.kq1sP4Wv-S2ehS91swYGYg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [-77.0428174, -12.0463782],
    zoom: 12
});