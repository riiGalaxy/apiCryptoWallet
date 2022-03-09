const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioSchema = new Schema(
  {
    coin: {
      type: String,
      required: true,
    },
    actualPrice: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
    },
    purchasePrice: {
      type: Number,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  {
    timestamps: true,
  }
);

const PortfolioModel = mongoose.model("portfolio", portfolioSchema);
module.exports = PortfolioModel;
