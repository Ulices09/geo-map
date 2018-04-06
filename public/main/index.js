const room = generateGuid()
var socket
//var recognition

$(document).ready(function() {
    //$("#linkToDatasets").attr("href", "http://localhost:3000/datasets/index.html?r=" + room)
    //window.open('http://localhost:3000/datasets/index.html?r=' + room, '_blank')
    //window.open('http://localhost:3000/details/index.html?r=' + room, '_blank')

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

    var commands = {
        'Oye Lisa': function() { 
            //console.log('Oye lisa escuchado')
            alert('Hola!');
        }
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    annyang.addCallback('result', function(whatWasHeardArray) {
        console.log(whatWasHeardArray)
        logger.disableLogger();
        responsiveVoice.speak(whatWasHeardArray[0]);
        logger.enableLogger();

        socket.emit('process-text-nlp', {
            room: room,
            data: { text: whatWasHeardArray[0] }
        })
    });

    annyang.start();
});

/*document.querySelector('#btnti').addEventListener('click', function() {
    socket.emit('to-details', {
        room: room,
        data: { message: 'from main' }
    })
})*/

var logger = function()
{
    var oldConsoleLog = null;
    var pub = {};

    pub.enableLogger =  function enableLogger() 
                        {
                            if(oldConsoleLog == null)
                                return;

                            window['console']['log'] = oldConsoleLog;
                        };

    pub.disableLogger = function disableLogger()
                        {
                            oldConsoleLog = console.log;
                            window['console']['log'] = function() {};
                        };

    return pub;
}();

document.querySelector('#rtl-section').addEventListener('click', function() {
    console.log('ggmi')
})

document.querySelector('#btnMic').addEventListener('click', function() {
    //recognition.start()
})

mapboxgl.accessToken = 'pk.eyJ1IjoidWxpY2VzMDkiLCJhIjoiY2o4Y2Z2MTlyMGFhNzJ4c2ZycDZ3dWw5OCJ9.kq1sP4Wv-S2ehS91swYGYg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [-77.0428174, -12.0463782],
    zoom: 12
});