const mongoose = require("mongoose");
const Schema = mongoose.Schema

const schema = mongoose.Schema(
    {
      Txhash : String,
      BlockNo : Number,
      DateTime:Date,
      From: String,
      To: String,
      Quantity: Number
    },
    { timestamps: true }
  );
  
  const transactions = mongoose.model("transactions", schema);
  
  module.exports = transactions;
  