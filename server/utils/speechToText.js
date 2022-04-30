const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");
const { IamAuthenticator } = require("ibm-watson/auth");
const fs = require("fs");


const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({ apikey: "Tsp6V8lAz5Pkw95z7NubBWRiv9Tfg4ciTBdHAPlWIKrx" }),
  serviceUrl: "https://api.us-south.speech-to-text.watson.cloud.ibm.com",
});

const transcribeSpeech = () => {
  return speechToText.recognize({
    audio: fs.createReadStream("speech.webm"),
    contentType: "audio/webm",
  });
};

module.exports = transcribeSpeech;
