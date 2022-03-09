const { Router } = require("express");
const coinMarketService = require("./crypto.services");

let memoryCoinMarket = {
  date: null,
  data: null,
};

const controller = (() => {
  const router = Router();

  //id coin
  router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const response = memoryCoinMarket.data.find(
      (value) => value.id === Number(id)
    );

    return res.status(200).json(response);
  });
  //list coin
  router.get("/", async (req, res) => {
    const getTime = Date.now();
    if (getTime - memoryCoinMarket.date > 3600000) {
      try {
        const { data } = await coinMarketService.getListCrypto();

        memoryCoinMarket = {
          date: getTime,
          data: data.data,
        };

        return res.status(200).json(data.data);
      } catch (error) {
        res.status(400).json({
          type: "error",
          message: error.message,
        });
      }
    } else {
      return res.status(200).json(memoryCoinMarket.data);
    }
  });

  return router;
})();

module.exports = controller;
