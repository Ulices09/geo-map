var socket_io = require('socket.io')
const language = require('@google-cloud/language')
var nlpHelper = require('../helpers/nlp')

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

        //NLP
        socket.on('process-text-nlp', (payload) => {
            
            const client = new language.LanguageServiceClient({
                keyFilename: './auth/MMINLPService-8cc128e72238.json'
            });

            const document = {
                content: payload.data.text,
                type: 'PLAIN_TEXT',
                language: 'es'
            };

            client
            .analyzeSyntax({document: document})
            //.analyzeEntities({document: document})            
            .then(results => {
                //const sentiment = results[0].documentSentiment;
                var nlpResult = nlpHelper.process_nlp(results[0].tokens, null)

                io.sockets.in(payload.room).emit('nlp-response', nlpResult)

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