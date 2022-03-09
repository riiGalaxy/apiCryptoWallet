const axios = require("axios");
const { COINMARKET_API_URL, COINMARKET_API_KEY } = require("../env");

class CoinMarketService {
  constructor() {
    this.api = axios.create({
      baseURL: COINMARKET_API_URL,
      headers: {
        "X-CMC_PRO_API_KEY": COINMARKET_API_KEY,
      },
    });
  }

  getListCrypto = async () => {
    return this.api.get("/cryptocurrency/listings/latest?limit=30");
  };

  getIdCrypto = async (id) => {
    return this.api.get(`/cryptocurrency/quotes/latest?id=${id}`);
  };
}

const coinMarketService = new CoinMarketService();

module.exports = coinMarketService;
