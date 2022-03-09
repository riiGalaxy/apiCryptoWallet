const axios = require("axios");
const { NEWS_API_URL, NEWS_API_KEY } = require("../env");

class NewsService {
  constructor() {
    this.news = axios.create({
      baseURL: NEWS_API_URL,
      headers: {
        Apikey: NEWS_API_KEY,
      },
    });
  }

  getNewsList = async () => {
    return this.news.get("/?lang=EN");
  };
}

const newsServices = new NewsService();

module.exports = newsServices;
