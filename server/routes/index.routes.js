const router = require("express").Router();
const authRoutes = require("./auth.routes");
const fs = require("fs");
const transcribeSpeech = require("../utils/speechToText");

router.get("/", async (req, res, next) => {
  res.json("All good in here");
});

router.post("/convertspeech", async (req, res, next) => {
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

router.use("/auth", authRoutes);

module.exports = router;
