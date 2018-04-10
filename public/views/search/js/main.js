var room

$(document).ready(function() {
    room = getQueryStringValue("r")
    
    socket = io.connect('http://localhost:3000', {'forceNew': true})

    socket.on('connect', function() {
        socket.emit('connect-room', room)
    })

    socket.on('nlp-response', function(data) {
        handleNLPResult(data)
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

document.querySelector('#navigation-section').addEventListener('click', function() {
    goToPage('navigation', socket, room)
})

document.querySelector('#datasets-section').addEventListener('click', function() {
    goToPage('datasets', socket, room)
})

//TODO: separar en un script por cada módulo
function handleNLPResult(result) {
    if(result.validation != null) {
        //TODO: Crear propio script para respuestas de voz
        speak(result.validation.message)
        return;
    }

    switch (result.response.action) {
        case 'redirect-to-realtime':
            document.getElementById('realtime-section').click()
            break
        case 'redirect-to-datasets':
            document.getElementById('datasets-section').click()
            break
        case 'redirect-to-navigation':
            document.getElementById('navigation-section').click()
            break
        case 'redirect-to-search':
            speak('Ya estás en esa opción')
            break
        default:
            break;
    }

}