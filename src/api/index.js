import axios from 'axios'

const api = axios.create({
    baseURL: 'https://hdxblockexplorer-server-production.up.railway.app/:8082/api',
})


export const getAddress = address => api.get(`/address/${address}`)
export const getAddressesAll = page => api.get(`/addressesall/${page}`)
export const getAddressesHdx = page => api.get(`/addresseshdx/${page}`)
export const getAddressesShdx = page => api.get(`/addressesshdx/${page}`)
export const getAddressesGhdx = page => api.get(`/addressesghdx/${page}`)
export const getAddressTxs = address => api.get(`/transactionss/${address}`)
export const getTx = tx => api.get(`/transaction/${tx}`)
export const getTxs = page => api.get(`/transactions/${page}`)
export const getBlock = tx => api.get(`/block/${tx}`)
export const getBlocks = address => api.get(`/blocks`)

const apis = {getAddress,getAddressTxs,getAddressesAll,getAddressesHdx,getAddressesShdx,getAddressesGhdx,getTxs,getTx,getBlock,getBlocks}

export default apis