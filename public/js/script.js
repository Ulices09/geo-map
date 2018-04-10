function getQueryStringValue (key) {  
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}

function generateGuid() {
    return new Date().valueOf().toString() + getRandomNumber(100)
}

function getRandomNumber(limit) {
    return Math.floor((Math.random() * limit) + 1)
}

function goToPage(page, socket, room) {
    const event = 'go-to-' + page + '-section'
    const url = 'http://localhost:3000/' + page + '/main?r=' + room

    socket.emit(event, {
        room: room
    })

    window.location.href = url
}

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

function speak(message) {
    annyang.pause()
    logger.disableLogger();
    responsiveVoice.speak(message);
    logger.enableLogger();
    setTimeout(function(){ annyang.resume() }, 4000);
}