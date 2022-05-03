const router = require("express").Router();
const authRoutes = require("./auth.routes");
const fs = require("fs");
const transcribeSpeech = require("../utils/speechToText");
const axios = require("axios");

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

const results = require("../utils/results.json");

router.get("/search", (req, res) => {
  const amazonSearchQuery = req.query.q.replaceAll("+", " ");

  // res.json(results.search_results)

  const params = {
    api_key: "E88D8E7E60414947A17F2AD00221C1F9",
    type: "search",
    amazon_domain: "amazon.de",
    search_term: amazonSearchQuery,
  };

  axios
    .get("https://api.rainforestapi.com/request", { params })
    .then((response) => {
      console.log(JSON.stringify(response.data.search_results, 0, 2));
      res.json(response.data.search_results, 0, 2);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.use("/auth", authRoutes);

router.use("/", search);
module.exports = router;
