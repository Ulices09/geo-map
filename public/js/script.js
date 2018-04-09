function getQueryStringValue (key) {  
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}

function generateGuid() {
    return new Date().valueOf().toString() + getRandomNumber(100)
}

function getRandomNumber(limit) {
    return Math.floor((Math.random() * limit) + 1)
}