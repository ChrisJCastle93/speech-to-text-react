const router = require("express").Router();
const authRoutes = require("./auth.routes");

const fs = require("fs");
const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

// SPEECH TO TEXT SETUP

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({ apikey: "Tsp6V8lAz5Pkw95z7NubBWRiv9Tfg4ciTBdHAPlWIKrx" }),
  serviceUrl: "https://api.us-south.speech-to-text.watson.cloud.ibm.com",
});

// router.get("/", async (req, res, next) => {
//   console.log(req.file)
//   const params = {
//     audio: fs.createReadStream("./../test.wav"),
//     contentType: "audio/l16; rate=44100",
//   };

//   speechToText
//     .recognize(params)
//     .then((response) => {
//       console.log(JSON.stringify(response.result, null, 2));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   res.json("All good in here");
// });

// MULTER SET UP

// const multer = require("multer");
// const upload = multer();

router.post("/test", async (req, res, next) => {
  // console.log(req.files.file.data.arrayBuffer());

  // console.log(req.file);
  console.log(req.files.file.data);
  // console.log(req.body);

  await fs.writeFile('paul12111.webm', req.files.file.data, () => {
    console.log('file created')
  })

  // const buffer = Buffer.from(req.files.file.data)

  // const arrayBuffer = new Uint8Array(buffer).buffer;
  // const final = Buffer.from(arrayBuffer);

  // console.log(arrayBuffer)

  speechToText
    .recognize({
      audio: fs.createReadStream("./paul12111.webm"),
      contentType: "audio/webm",
    })
    .then((response) => {
      const result = JSON.stringify(response.result.results[0].alternatives[0].transcript, null, 2);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.use("/auth", authRoutes);

module.exports = router;
