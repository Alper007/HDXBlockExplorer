import {useEffect, useState} from 'react'
import '../App.css';
import {BigNumber, ethers } from "ethers";
import {ADDRESS, SHDXADDRESS } from "../info/address";
import { HDX_ABI, SHDX_ABI} from "../info/abi.js";
import { useNavigate ,useHistory, useLocation } from 'react-router-dom' 



const Anasayfa = () => {
  const [totalHDX, setTotalHDX] = useState(BigNumber.from(0).toString())
  const [stakedHDX, setStakedHDX] = useState(BigNumber.from(0).toString())
  const [price, setPrice] = useState("")

  const [value, setValue] = useState("")
  const navigate = useNavigate()

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
      
  }
  asyncFn()

  },[]) 
  
  return (
    <div className='navs'>
      <div className='blockexplorer'>HDX BLOCK EXPLORER</div>
      <div className='inputbutton'>
        <input className='inputhome' placeholder='Search by Address,Block,Transaction' value={value} onChange={(e)=>setValue(e.target.value.trim())}></input>
        <button  className='buttonhome' onClick={()=>search(value)}>SEARCH </button>
      </div>
      <div className='navs'>
        <div className='nav'>
          <div className='navtext'>Total Supply:</div>
          <div className='navnumber'>{comma(BigNumber.from(totalHDX).toString().slice(0,-9))} </div>
        </div>
        <div className='nav'>
          <div className='navtext'>Staked HDX:</div>
          <div className='navnumber'>{comma(BigNumber.from(stakedHDX).toString().slice(0,-9))} </div>
        </div>
        <div className='nav'>
          <div className='navtext'>Staked Ratio:</div>
          <div className='navnumber'>{(BigNumber.from(stakedHDX).toString().slice(0,-9)/
          BigNumber.from(totalHDX).toString().slice(0,-9)*100).toString().slice(0,-12)+" %"}</div>
        </div>
        <div className='nav'>
          <div className='navtext'>Price:</div>
          <div className='navnumber'>{price}</div>
        </div>
      </div>
    </div>
  )
  };
  
  export default Anasayfa;