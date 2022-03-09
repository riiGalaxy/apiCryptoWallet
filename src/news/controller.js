const { Router } = require("express");

const newsServices = require("./news.services");

const controller = (() => {
  const router = Router();

  //list news
  router.get("/", async (req, res) => {
    try {
      const { data } = await newsServices.getNewsList();
      return res.status(200).json(data);
    } catch {
      res.status(400).json({
        type: "error",
        message: error.message,
      });
    }
  });
  return router;
})();

module.exports = controller;
