$(document).ready(function() {

    const room = generateGuid()

    setTimeout(function(){ 
        // window.open('http://localhost:3000/datalist/realtime?r=' + room, '_blank')
        // window.open('http://localhost:3000/detail/realtime?r=' + room, '_blank')
        window.location.href = 'http://localhost:3000/realtime/main?r=' + room
    }, 4000);

})