const express = require("express");
const router = express.Router();
const userService = require("../users");
const portfolioService = require("../portfolio");
const coinMarketService = require("../coinmarket");
const passport = require("passport");
const newsService = require("../news");

router.get("/", (req, res) => {
  res.send("Welcome to API");
});

router.use("/user", userService.UserController);

router.use(
  "/portfolio",
  passport.authenticate("jwt"),
  portfolioService.PortfolioController
);

router.use("/coin-market", coinMarketService.CoinMarketController);

router.use("/news", newsService.newsController);

module.exports = router;
