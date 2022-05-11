const router = require("express").Router();
const fs = require("fs");
const transcribeSpeech = require("../utils/speechToText");

router.post("/", async (req, res, next) => {
  try {
    const noop = () => {};
    await fs.writeFile("speech.webm", req.files.file.data, noop);

    const response = await transcribeSpeech();
    const result = JSON.stringify(response.result.results[0].alternatives[0].transcript, null, 2);

    fs.unlinkSync("speech.webm");

    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
