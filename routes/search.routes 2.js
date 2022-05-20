const router = require("express").Router();
const fs = require("fs");
const axios = require("axios");

const results = require("../utils/results.json");
const productResult = require("../utils/productDetailsResult.json");

const redis = require("redis");
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const cacheSearch = async (req, res, next) => {
  const amazonSearchQuery = req.query.q.replaceAll("+", " ");

  const client = await redis.createClient(REDIS_PORT);
  await client.connect();
  req.client = client;
  const data = await client.get(amazonSearchQuery);

  if (data !== null) {
    const parsedData = JSON.parse(data);

    const filteredData = parsedData.filter((item) => !!item.prices);

    res.json(filteredData);
  } else {
    console.log("NOTHING IN CACHE");
    next();
  }
};

const cacheProduct = async (req, res, next) => {
  const productToSearch = req.params.id;
  
  const client = await redis.createClient(REDIS_PORT);
  await client.connect();
  req.client = client;
  const data = await client.get(productToSearch);
  
  if (data !== null) {
    const parsedData = JSON.parse(data);
    console.log('FROM CACHE')
    res.json(parsedData);
  } else {
    console.log("NOTHING IN CACHE");
    next();
  }
};

router.get("/", cacheSearch, async (req, res) => {
// router.get("/", async (req, res) => {
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
    const filteredData = searchResults.filter((item) => !!item.prices);
    res.json(filteredData);
  } catch (err) {
    console.log(err);
  }
});

router.get("/results/:id", cacheProduct, async (req, res, next) => {
// router.get("/results/:id", async (req, res, next) => {
  try {
    const { client } = req;

    const productToSearch = req.params.id;

    console.log('PRODUCT TO SEARCH', productToSearch)

    const params = {
      api_key: "E88D8E7E60414947A17F2AD00221C1F9",
      type: "product",
      amazon_domain: "amazon.de",
      asin: productToSearch,
    };

    const response = await axios.get("https://api.rainforestapi.com/request", { params })

    const productResults = response.data;

    await client.set(productToSearch, JSON.stringify(productResults), 3600);
    console.log('NOT FROM CACHE')
    console.log(productResults)

    res.json(productResults);

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
