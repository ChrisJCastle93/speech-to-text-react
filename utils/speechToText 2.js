const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");
const { IamAuthenticator } = require("ibm-watson/auth");
const fs = require("fs");


const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({ apikey: process.env.IBM_API_KEY }),
  serviceUrl: process.env.IBM_URL,
});

const transcribeSpeech = () => {
  return speechToText.recognize({
    audio: fs.createReadStream("speech.webm"),
    contentType: "audio/webm",
  });
};

module.exports = transcribeSpeech;
