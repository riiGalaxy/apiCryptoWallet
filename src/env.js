require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/crypto_wallet";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret_key";
const SALT_BCRYPT = Number(process.env.SALT_BCRYPT) || 10;
const JWT_EXPIRE_TIME = process.env.JWT_EXPIRE_TIME || "1d";
const COINMARKET_API_URL = process.env.COINMARKET_API_URL || "";
const COINMARKET_API_KEY = process.env.COINMARKET_API_KEY || "";
const NEWS_API_URL = process.env.NEWS_API_URL;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

module.exports = {
  PORT,
  MONGODB_URL,
  JWT_SECRET_KEY,
  SALT_BCRYPT,
  JWT_EXPIRE_TIME,
  COINMARKET_API_URL,
  COINMARKET_API_KEY,
  NEWS_API_URL,
  NEWS_API_KEY,
};
