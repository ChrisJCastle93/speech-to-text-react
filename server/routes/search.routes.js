const router = require("express").Router();
const fs = require("fs");
const axios = require("axios");

const results = require("../utils/results.json");
const productResult = require("../utils/productDetailsResult.json");

const writeResultsToCache = () => {
  fs.writeFile('../cache')
}


router.get("", (req, res) => {
  const amazonSearchQuery = req.query.q.replaceAll("+", " ");

  res.json(results.search_results);

  // const params = {
  //   api_key: "E88D8E7E60414947A17F2AD00221C1F9",
  //   type: "search",
  //   amazon_domain: "amazon.de",
  //   search_term: amazonSearchQuery,
  // };

  // axios
  //   .get("https://api.rainforestapi.com/request", { params })
  //   .then((response) => {
  //     console.log(JSON.stringify(response.data.search_results, 0, 2));
  //     res.json(response.data.search_results, 0, 2);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
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
