var socket_io = require('socket.io')
const language = require('@google-cloud/language')

module.exports.listen = function(server) {
    io = socket_io.listen(server)

    io.on('connection', (socket) => {

        socket.on('connect-room', (room) => {
            socket.join(room)
            console.log('cliento connected to ' + room)
        })


        //redirections
        socket.on('go-to-realtime-section', function(payload) {
            io.sockets.in(payload.room).emit('redirect-to-realtime-section', { room: payload.room})
        })

        socket.on('go-to-navigation-section', function(payload) {
            io.sockets.in(payload.room).emit('redirect-to-navigation-section', { room: payload.room})
        })

        socket.on('go-to-datasets-section', function(payload) {
            io.sockets.in(payload.room).emit('redirect-to-datasets-section', { room: payload.room})
        })

        socket.on('go-to-search-section', function(payload) {
            io.sockets.in(payload.room).emit('redirect-to-search-section', { room: payload.room})
        })


        

        socket.on('to-main', (payload) => {
            io.sockets.in(payload.room).emit('from-datasets', payload.data)
        })

        socket.on('to-details', (payload) => {
            io.sockets.in(payload.room).emit('from-main', payload.data)
        })

        socket.on('process-text-nlp', (payload) => {
            
            const client = new language.LanguageServiceClient({
                keyFilename: './auth/MMINLPService-8cc128e72238.json'
            });

            const document = {
                content: payload.data.text,
                type: 'PLAIN_TEXT',
            };

            client
            .analyzeSyntax({document: document})
            .then(results => {
                //const sentiment = results[0].documentSentiment;

                io.sockets.in(payload.room).emit('nlp-response', results)

                /*console.log(`Text: ${text}`);
                console.log(`Sentiment score: ${sentiment.score}`);
                console.log(`Sentiment magnitude: ${sentiment.magnitude}`);*/
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
        })

    })


    return io
}