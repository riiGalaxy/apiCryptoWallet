const { Router } = require("express");
const PortfolioModel = require("./model");

const coinMarketService = require("../coinmarket/crypto.services");

const idCoin = {
  Bitcoin: "1",
  Ethereum: "1027",
  Binance: "1839",
  Solana: "5426",
  Matic: "3890",
  Cake: "7186",
  Bake: "7064",
  VetChain: "3077",
  Coti: "3992",
  HBar: "4642",
  VTHO: "3012",
  Beam: "3702",
  GRT: "6719",
  ADA: "2010",
  FET: "3773",
  FTM: "3513",
  UNI: "7083",
  XTZ: "2011",
  IOTA: "1720",
  Sushi: "6758",
  Theta: "2416",
  SRM: "6187",
  Mana: "1966",
  Kava: "4846",
  Near: "6535",
  Rune: "4157",
  Akro: "4134",
  Luna: "4172",
};

const controller = (() => {
  const router = Router();

  // investment list
  router.get("/investment", async (req, res) => {
    const { user } = req;

    try {
      const investments = await PortfolioModel.find({ userId: user._id });

      await Promise.all(
        investments.map(async (investment) => {
          const { data } = await coinMarketService.getIdCrypto(
            idCoin[investment.coin]
          );
          investment.actualPrice =
            data.data[idCoin[investment.coin]].quote["USD"].price;
        })
      );

      res.status(200).json(investments);
    } catch (error) {
      res.status(400).json({
        type: "error",
        message: error.message,
      });
    }
  });
  // create investment
  router.post("/investment", async (req, res) => {
    const { user } = req;
    const { coin, quantity, purchasePrice } = req.body;
    const createdAt = Date.now();

    try {
      const investment = await PortfolioModel.create({
        coin,
        quantity,
        purchasePrice,
        createdAt,
        userId: user._id,
      });
      res.status(200).json(investment);
    } catch (error) {
      res.status(400).json({
        type: "error",
        message: error.message,
      });
    }
  });

  //update investment
  router.put("/investment/:id", async (req, res) => {
    const { id } = req.params;
    const { quantity, purchasePrice } = req.body;
    const updatedAt = Date.now();

    try {
      await PortfolioModel.updateOne(
        { _id: id },
        { quantity, purchasePrice, updatedAt },
        { new: true }
      );
      const investment = await PortfolioModel.findById({ _id: id });

      res.status(200).json(investment);
    } catch (error) {
      res.status(400).json({
        type: "error",
        message: error.message,
      });
    }
  });
  //delete investment
  router.delete("/investment/:id", async (req, res) => {
    const { id } = req.params;
    console.log("api borrandoooooo");

    try {
      const investment = await PortfolioModel.deleteOne({ _id: id });
      res.status(200).json(investment);
    } catch (error) {
      res.status(400).json({
        type: "error",
        message: error.message,
      });
    }
  });

  return router;
})();

module.exports = controller;
