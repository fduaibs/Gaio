const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const watsonConfig = require('../config/watson');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: watsonConfig.api_key,
  }),
  url: watsonConfig.url,
});

module.exports = textToSpeech;