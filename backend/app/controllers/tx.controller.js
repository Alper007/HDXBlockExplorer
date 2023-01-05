const Txs = require("../models/Txs")
const Allmap = require("../models/Allmap")
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


getAddress = (req, res) => {
  Allmap.find({ address: req.params.address  }, (err, txs) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!txs) {
          return res
              .status(404)
              .json({ success: false, error: `not found` })
      }
      return res.status(200).json({ success: true, data: txs })
  })
}

getAddressesAll =  (req, res) => {
  const resultsPerPage = 100;
  const page = req.params.page;
  Allmap.find().sort({ all :'descending'}).skip(resultsPerPage * (page-1)).limit(resultsPerPage).exec((err, add) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!add) {
          return res
              .status(404)
              .json({ success: false, error: `not found` })
      }
      return res.status(200).json({ success: true, data: add })
  })
  }

getAddressesHdx =  (req, res) => {
  const resultsPerPage = 100;
  const page = req.params.page;
  Allmap.find().sort({ hdx :'descending'}).skip(resultsPerPage * (page-1)).limit(resultsPerPage).exec((err, add) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!add) {
          return res
              .status(404)
              .json({ success: false, error: `not found` })
      }
      return res.status(200).json({ success: true, data: add })
  })
  }
getAddressesShdx =  (req, res) => {
  const resultsPerPage = 100;
  const page = req.params.page;
  Allmap.find().sort({ shdx :'descending'}).skip(resultsPerPage * (page-1)).limit(resultsPerPage).exec((err, add) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!add) {
          return res
              .status(404)
              .json({ success: false, error: `not found` })
      }
      return res.status(200).json({ success: true, data: add })
  })
  }
getAddressesGhdx =  (req, res) => {
  const resultsPerPage = 100;
  const page = req.params.page;
  Allmap.find().sort({ ghdx :'descending'}).skip(resultsPerPage * (page-1)).limit(resultsPerPage).exec((err, add) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!add) {
          return res
              .status(404)
              .json({ success: false, error: `not found` })
      }
      return res.status(200).json({ success: true, data: add })
  })
  }
getAddressTxs = (req, res) => {
    Txs.find(
        {
            $or: [
              { 'From': req.params.address },
              { 'To': req.params.address }
            ]
          }, (err, txs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!txs) {
            return res
                .status(404)
                .json({ success: false, error: `not found` })
        }
        return res.status(200).json({ success: true, data: txs })
    }).catch(err => console.log(err))
  }

getTxs = (req, res) => {
  const resultsPerPage = 100;
  const page = req.params.page;
    Txs.find().sort({DateTime: '-1'}).skip(resultsPerPage * (page-1)).limit(resultsPerPage).exec( (err, txs) => {
      
      return res.status(200).json({ success: true, data: txs })
  })
}
getTx = (req, res) => {

    Txs.find({ Txhash: req.params.tx }, (err, txs) => {
      
      return res.status(200).json({ success: true, data: txs })
  })
}

getBlocks = (req, res) => {
  Txs.find().sort({BlockNo: 'descending'}).limit(100).exec( (err, txs) => {
    
    return res.status(200).json({ success: true, data: txs })
})
}
getBlock = (req, res) => {
  Txs.find({ BlockNo: req.params.block }, (err, txs) => {
    
    return res.status(200).json({ success: true, data: txs })
})
}

module.exports = {getAddress,getAddressTxs,getAddressesAll,getAddressesHdx,getAddressesShdx,getAddressesGhdx,getTxs,getTx,getBlocks,getBlock};
