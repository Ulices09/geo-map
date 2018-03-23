const guid = new Date().valueOf().toString() + getRandomNumber(100)
const MAIN_ID = 'main'
const SECONDARY_A = 'sa'
const SECONDARY_B = 'sb'

const MAIN_SOCKET_ID = guid + MAIN_ID
const SECONDARY_A_SOCKET_ID = guid + SECONDARY_A
const SECONDARY_B_SOCKET_ID = guid + SECONDARY_B

var socket = io.connect('http://localhost:3000', {'forceNew': true})

function getRandomNumber(limit) {
    return Math.floor((Math.random() * limit) + 1)
}

socket.on('connect', function() {
    socket.id = MAIN_SOCKET_ID
    console.log(socket)
})

document.querySelector('#btnti').addEventListener('click', function() {
    socket.emit('test-id', {message: 'hola que tal'})
})