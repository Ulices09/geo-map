var nlpConstants = require('../constants/index').nlp
var keywords = require('../constants/keywords')

function wordIsContainedIn(word, array) {
    return (array.indexOf(word) > -1)
}

//Por el momento solo aplicado a redirección de vistas
//Considerar separar los helper y constantes de nlp por módulo
function process_nlp(tokens, module) {
    if(tokens[0].partOfSpeech.tag == nlpConstants.speechTags.verb) {
        if(wordIsContainedIn(tokens[0].lemma, keywords.redirect.verbs.array)) {

            if(tokens[1].partOfSpeech.tag == nlpConstants.speechTags.adposition) {
                if(wordIsContainedIn(tokens[1].text.content, keywords.redirect.adpositions.array)) {

                    if(tokens[2].partOfSpeech.tag == nlpConstants.speechTags.noun) {
                        if(wordIsContainedIn(tokens[2].text.content, keywords.redirect.nouns.array)) {
                            
                            var noun = tokens[2].text.content
                            var nounValues = keywords.redirect.nouns.values
                            var adjValues = keywords.redirect.adjective.values

                            if(noun == nounValues.tiempo) {
                                if(tokens[3].partOfSpeech.tag == nlpConstants.speechTags.adjective) {
                                    if(wordIsContainedIn(tokens[3].text.content, keywords.redirect.adjective.array )) {
                                        if(tokens[3].text.content == adjValues.real) {
                                            return {
                                                validation: null,
                                                response: {
                                                    message: '',
                                                    action: 'redirect-to-realtime'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else if(noun == nounValues.datos) {
                                if(tokens[3].partOfSpeech.tag == nlpConstants.speechTags.adjective) {
                                    if(wordIsContainedIn(tokens[3].text.content, keywords.redirect.adjective.array )) {
                                        if(tokens[3].text.content == adjValues.estadisticos) {
                                            return {
                                                validation: null,
                                                response: {
                                                    message: '',
                                                    action: 'redirect-to-datasets'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else if(noun == nounValues.navegacion) {
                                return {
                                    validation: null,
                                    response: {
                                        message: '',
                                        action: 'redirect-to-navigation'
                                    }
                                }
                            }
                            else if(noun == nounValues.buscador) {
                                return {
                                    validation: null,
                                    response: {
                                        message: '',
                                        action: 'redirect-to-search'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return {
        validation: {
            message: 'No te entiendo.'
        }
    }
}

module.exports.process_nlp = process_nlp


