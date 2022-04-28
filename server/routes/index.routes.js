const router = require("express").Router();
const authRoutes = require("./auth.routes");

const fs = require("fs");
const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({ apikey: "Tsp6V8lAz5Pkw95z7NubBWRiv9Tfg4ciTBdHAPlWIKrx" }),
  serviceUrl: "https://api.us-south.speech-to-text.watson.cloud.ibm.com",
});

const params = {
  // From file
  audio: fs.createReadStream("./../test.wav"),
  contentType: "audio/l16; rate=44100",
};

/* GET home page */
router.get("/", async (req, res, next) => {
  speechToText
    .recognize(params)
    .then((response) => {
      console.log(JSON.stringify(response.result, null, 2));
    })
    .catch((err) => {
      console.log(err);
    });
  res.json("All good in here");
});

router.use("/auth", authRoutes);

module.exports = router;
