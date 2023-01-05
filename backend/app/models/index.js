// const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");

const Schema = mongoose.Schema

var schema = mongoose.Schema(
    {
      address : String,
      hdx : String,
      shdx: String,
      ghdx: String,
      all: String
    },
    { timestamps: true }
  );

const AllMap = mongoose.model("AllMap", schema);

module.exports = AllMap;


const Schema2 = mongoose.Schema
const schema2 = mongoose.Schema(
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

const Txs = mongoose.model("Txs", schema2);

module.exports = Txs;



  