import {useEffect, useState} from 'react'
import '../App.css';
import {BigNumber, ethers } from "ethers";
import {ADDRESS, SHDXADDRESS } from "../info/address";
import { HDX_ABI, SHDX_ABI} from "../info/abi.js";
import { useNavigate ,useHistory, useLocation } from 'react-router-dom' 
import api from '../api/index'
import { Outlet, Link } from "react-router-dom";


const Anasayfa = () => {
  const [totalHDX, setTotalHDX] = useState(BigNumber.from(0).toString())
  const [stakedHDX, setStakedHDX] = useState(BigNumber.from(0).toString())
  const [price, setPrice] = useState("")
  const [addresss,setAddresss] =useState([])
  const [value, setValue] = useState("")
  const navigate = useNavigate()

  const [txss, setTxss] = useState([])
  
  useEffect( ()=>{
    api.getTxs(1).then(txd => {
      setTxss(txd.data.data)
    });
  },[txss]) 


  const search = () => {
    if(value.length == 42){
      navigate(`/Address/${value.toLocaleLowerCase()}`)
      navigate(0)
    }else if(value.length == 66){
      
      navigate(`/Transaction/${value.toLocaleLowerCase()}`)
      navigate(0)
    }
  }

  const comma = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }  

  const provider = new ethers.providers.AlchemyProvider( "arbitrum" ,"h4bsS1_3SZC0JOou9tz3xgg-fvrnG5-U" );
  const _HdxToken = new ethers.Contract(ADDRESS,HDX_ABI,provider);
  const _ShdxToken = new ethers.Contract(SHDXADDRESS, SHDX_ABI,provider);
  
  useEffect( ()=>{
    const asyncFn = async () => {
      const TotalHdx = await _HdxToken.totalSupply();
      setTotalHDX(TotalHdx)
      const StakedHdx = await _HdxToken.balanceOf("0xd20cdf95a08acdf8aa360232caeda6e59a06951d")
      setStakedHDX(StakedHdx)
      var x = await fetch('https://api.coingecko.com/api/v3/coins/hydranet/tickers');
		  var y = await x.json();
		  var z = await y.tickers[0].last.toString().substr(0,6);
      setPrice(z)
      const result = await api.getAddressesAll(1)
      setAddresss(result.data.data)
  }
  asyncFn()

  },[]) 
  
  return (
    <div className='navs'>
      <div className='blockexplorer'>HDX BLOCK EXPLORER</div>
      <div className='inputbutton'>
        <input className='inputhome' placeholder='Search by Address, Block, Transaction' value={value} onChange={(e)=>setValue(e.target.value.trim())}></input>
        <button  className='buttonhome' onClick={()=>search(value)}>SEARCH </button>
      </div>

      <div className='infos'>
      <div className='navs'>
        <div className='nav'>
          <div className='navtext'>TOTAL SUPPLY:</div>
          <div className='navnumber'>{comma(BigNumber.from(totalHDX).toString().slice(0,-9))} </div>
        </div>
        <div className='nav'>
          <div className='navtext'>STAKED HDX:</div>
          <div className='navnumber'>{comma(BigNumber.from(stakedHDX).toString().slice(0,-9))} </div>
        </div>
        <div className='nav'>
          <div className='navtext'>STAKED RATIO:</div>
          <div className='navnumber'>{(BigNumber.from(stakedHDX).toString().slice(0,-9)/
          BigNumber.from(totalHDX).toString().slice(0,-9)*100).toString().slice(0,-12)+" %"}</div>
        </div>
        <div className='nav'>
          <div className='navtext'>PRICE:</div>
          <div className='navnumber'>${price}</div>
        </div>
        <div className='nav'>
          <div className='navtext'>MARKET CAP:</div>
          <div className='navnumber'>$ {comma((BigNumber.from(totalHDX)*price).toString().slice(0,-9))} </div>
        </div>
      </div>
      </div>
      <div className='latesttx'>
        <div style={{"fontSize":"20px", "color":"white","marginTop":"14px"}}>
        <a style={{"color":"white"}} href='/Transactions'>
        LATEST TRANSACTIONS
            </a>
        </div>
        <div className="line1home">
            <div className="DateTime2">BlockNo</div>
            <div className="DateTime2">Txhash</div>
            <div className="DateTime2">DateTime</div>
            <div className="DateTime2">From</div>
            <div className="DateTime2">Quantity</div>
            <div className="DateTime2">To</div>
          </div>
        {
         txss.slice(0, 10).map((element,i)=>(
           <div  className='linehometx' key={i}>
             <div className="orderhome">{ (i+1)}</div>
             <Link to={`/Blocks/${element.BlockNo}`}>
              <div className='DateTime2'>{(element.BlockNo).toString()}</div>
              </Link>
             <div className='DateTime2'>
              <Link to={`/Transaction/${element.Txhash}`}>
                {(element.Txhash).toString().substr(0,6) +"....." +(element.Txhash).toString().substr(-6,6)}</Link>
              </div>
             <div className='DateTime2'>{((element.DateTime).toString().slice( 0 , 10 ))}</div>
             <Link to={`/Address/${element.From}`}>
              <div className='DateTime2'>
              {(element.From).toString().substr(0,5) +"....." +(element.From).toString().substr(-5,5)}</div>
              </Link>
             <div className='DateTime2'>{(element.Quantity).toFixed(2)}</div>
             <Link to={`/Address/${element.To}`}>
              <div className='DateTime2'>
              {(element.To).toString().substr(0,5) +"....." +(element.To).toString().substr(-5,5)}</div>
              </Link>
           </div>
         ))
       }
      </div>
      <div className='homeaddreses'>
      <div style={{"fontSize":"20px", "color":"white","marginTop":"14px"}}>
      <a style={{"color":"white"}} href='/Addresses'>
      TOP ADDRESSES
            </a>
        </div>
        <div className="line1home">
          <div className="orderhome">RANK</div>
          <div className="addresshome">ADDRESS</div>
          <div className="amount1home">HDX+SHDX+(GHDX*1.42)</div>
          
      </div>
        <div className='bodyhdx1' id='bodyhdx' >
      {
        addresss.slice(0, 10).map((element,i)=>(
          <div  className='linehome' key={i}>
            <div className="orderhome">{(i+1)}</div>
            <div className='addresshome'>
            <Link to={`/Address/${element.address}`}>{(element.address).toString()}</Link>
            </div>
            <div className='amount1home'>{comma(((Number(element.hdx)+Number(element.shdx)+(Number(element.ghdx)*145/100))).toFixed(2)) == 0 ? "0" : comma(((Number(element.hdx)+Number(element.shdx)+(Number(element.ghdx)*145/100))).toFixed(2))}</div>
           
          </div>
        ))
      }
      </div>
      </div>
    </div>
  )
  };
  
  export default Anasayfa;