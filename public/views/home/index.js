$(document).ready(function() {

    const room = generateGuid()

    setTimeout(function(){ 
        window.open('http://localhost:3000/realtime/datalist?r=' + room, '_blank')
        window.open('http://localhost:3000/realtime/detail?r=' + room, '_blank')
        window.location.href = 'http://localhost:3000/realtime/main?r=' + room
    }, 4000);

})