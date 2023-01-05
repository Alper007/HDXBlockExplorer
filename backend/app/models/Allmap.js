const mongoose = require("mongoose");
const Schema = mongoose.Schema

var schema = mongoose.Schema(
    {
      address : String,
      hdx : Number,
      shdx: Number,
      ghdx: Number,
      all: Number
    },
    { timestamps: true }
  );

const AllMap = mongoose.model("AllMap", schema);

module.exports = AllMap;