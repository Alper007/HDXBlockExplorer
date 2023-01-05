const express = require('express')

const Txcontrol = require('../controllers/tx.controller')

const router = express.Router()

router.get('/addressesall/:page', Txcontrol.getAddressesAll)
router.get('/addresseshdx/:page', Txcontrol.getAddressesHdx)
router.get('/addressesshdx/:page', Txcontrol.getAddressesShdx)
router.get('/addressesghdx/:page', Txcontrol.getAddressesGhdx)
router.get('/address/:address', Txcontrol.getAddress)
router.get('/transactions/:page', Txcontrol.getTxs)
router.get('/transaction/:tx', Txcontrol.getTx)
router.get('/transactionss/:address', Txcontrol.getAddressTxs)
router.get('/blocks', Txcontrol.getBlocks)
router.get('/block/:block', Txcontrol.getBlock)

module.exports = router

