const router = require("express").Router();
const fs = require("fs");
const axios = require("axios");

const results = require("../utils/results.json");
const productResult = require("../utils/productDetailsResult.json");

const redis = require("redis");
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const cache = async (req, res, next) => {
  const amazonSearchQuery = req.query.q.replaceAll("+", " ");

  const client = await redis.createClient(REDIS_PORT);
  await client.connect();
  req.client = client;
  const data = await client.get(amazonSearchQuery);

  if (data !== null) {

    const parsedData = JSON.parse(data)
    console.log(parsedData.length)
    
    const filteredData = parsedData.filter((item) => !!item.prices);
    
    console.log(filteredData.length)
    // console.log(filteredData[0])

    res.json((filteredData));
    // res.json(JSON.parse(data));
  } else {
    console.log("NOTHING IN CACHE");
    next();
  }
};

router.get("", cache, async (req, res) => {
  try {
    const { client } = req;

    const amazonSearchQuery = req.query.q.replaceAll("+", " ");

    const params = {
      api_key: "E88D8E7E60414947A17F2AD00221C1F9",
      type: "search",
      amazon_domain: "amazon.de",
      search_term: amazonSearchQuery,
    };

    const response = await axios.get("https://api.rainforestapi.com/request", { params });
    const searchResults = response.data.search_results;
    await client.set(amazonSearchQuery, JSON.stringify(searchResults), 3600);
    res.json(searchResults);
  } catch (err) {
    console.log(err);
  }
});

router.get("/results/:id", (req, res) => {
  res.json(productResult);
  // axios
  //   .get(`https://api.rainforestapi.com/request?api_key=E88D8E7E60414947A17F2AD00221C1F9&type=product&amazon_domain=amazon.com&asin=${req.params.id}`)
  //   .then((response) => {
  //     res.json(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
});

module.exports = router;
