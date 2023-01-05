const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require('./app/routes/routes')
const app = express();

const Allmap = require("./app/models/Allmap");
const transactions = require("./app/models/Txs");
const mongoose = require("mongoose");

const url = "mongodb+srv://hdx:hdx@allmap.xsqu1ex.mongodb.net/?retryWrites=true&w=majority"

mongoose.set('strictQuery', false);
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use('/api', router)
app.listen( 8082, () => {
  console.log(`Server is running on port 8082.`);
});



const Web3 =require("web3")
const HDX_ABI = require("./web3/hdxabi")
const SHDX_ABI = require("./web3/shdxabi")
const GHDX_ABI = require("./web3/ghdxabi")
const ADDRESS = require("./web3/address")
const SADDRESS = require("./web3/saddress")
const GADDRESS = require("./web3/gaddress")

const rpcURL = "wss://arb-mainnet.g.alchemy.com/v2/h4bsS1_3SZC0JOou9tz3xgg-fvrnG5-U"
var web3 = new Web3(rpcURL);
var _HdxToken = new web3.eth.Contract(HDX_ABI, ADDRESS);
var _ShdxToken = new web3.eth.Contract(SHDX_ABI, SADDRESS);
var _GhdxToken = new web3.eth.Contract(GHDX_ABI, GADDRESS);

var tarih = new Date();

async function add(){
_HdxToken.events.Transfer()
    .on('data', (m) => {
  	const transa = new transactions(
			{
				Txhash : m.transactionHash,
				BlockNo : m.blockNumber,
				DateTime: tarih,
				From: m.returnValues.from.toLowerCase(),
				To: m.returnValues.to.toLowerCase(),
				Quantity: m.returnValues.value/Math.pow(10,9)
			})
      transa.save()

		Allmap.findOne({address:m.returnValues.to.toLowerCase()},(err,data)=>{
			if(data){
				if(err){
					console.log(err)
				}
				data.hdx = (Number(data.hdx) + Number(m.returnValues.value/Math.pow(10,9))).toFixed(0)
				data.save()
				console.log(data)
			}
		})
		Allmap.findOne({address:m.returnValues.from.toLowerCase()},(err,data)=>{
			if(data){
				if(err){
				console.log(err)
				}
				data.hdx = (Number(data.hdx) - Number(m.returnValues.value/Math.pow(10,9))).toFixed(0)
				data.save()
				console.log(data)
			}
		})
	})
	_ShdxToken.events.Transfer()
    .on('data', (m) => {
		Allmap.findOne({address:m.returnValues.to.toLowerCase()},(err,data)=>{
			if(data){
				if(err){
					console.log(err)
				}
				data.shdx = (Number(data.shdx) + Number(m.returnValues.value/Math.pow(10,9))).toFixed(0)
				data.save()
				console.log(data)
			}
		})
		Allmap.findOne({address:m.returnValues.from.toLowerCase()},(err,data)=>{
			if(data){
				if(err){
				console.log(err)
				}
				data.shdx = (Number(data.shdx) - Number(m.returnValues.value/Math.pow(10,9))).toFixed(0)
				data.save()
				console.log(data)
			}
		})
	})
	_GhdxToken.events.Transfer()
    .on('data', (m) => {
		Allmap.findOne({address:m.returnValues.to.toLowerCase()},(err,data)=>{
			if(data){
				if(err){
					console.log(err)
				}
				data.ghdx = (Number(data.ghdx) + Number(m.returnValues.value/Math.pow(10,18))).toFixed(0)
				data.save()
				console.log(data)
			}
		})
		Allmap.findOne({address:m.returnValues.from.toLowerCase()},(err,data)=>{
			if(data){
				if(err){
				console.log(err)
				}
				data.ghdx = (Number(data.ghdx) - Number(m.returnValues.value/Math.pow(10,18))).toFixed(0)
				data.save()
				console.log(data)
			}
		})
	})
}
add()
