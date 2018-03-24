const room = generateGuid()
//const MAIN_ID = 'mv'
//const DATASETS_ID = 'dv'
//const DETAILS_ID = 'dv'

//const MAIN_SOCKET_ID = guid + MAIN_ID
//const DATASETS_SOCKET_ID = guid + DATASETS_ID
//const DETAILS_SOCKET_ID = guid + DETAILS_ID

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



document.querySelector('#btnti').addEventListener('click', function() {
    socket.emit('to-details', {
        room: room,
        data: { message: 'from main' }
    })
})