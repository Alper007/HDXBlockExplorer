import {useEffect, useState} from 'react'
import { Outlet, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import api from '../api/index'
import axios from 'axios'
import { useParams } from "react-router-dom";
import { useNavigate ,useHistory, useLocation } from 'react-router-dom'

export default function Addresses() {

  const [addresss, setAddresss] = useState([])
  const [coin,setCoin] = useState("ALL")
  const [page,setPage] = useState(1)
  const params = useParams();
  const navigate = useNavigate()


useEffect( ()=>{
  func()
},[addresss])

const func = async ()=>{
  if(coin === "ALL"){
    const result = await api.getAddressesAll(page)
    setAddresss(result.data.data)
    return;
  }else if(coin==="SHDX"){
    const result1 = await api.getAddressesShdx(page)
    setAddresss(result1.data.data)
    return;
  }else if(coin==="HDX"){
    const result2 = await api.getAddressesHdx(page)
    setAddresss(result2.data.data)
    return;
  }else if(coin==="GHDX"){
    const result3 = await api.getAddressesGhdx(page)
    setAddresss(result3.data.data)
    return;
  }
}


  const comma = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className='p-4' style={{float:"left"}}>
       <div className='body0' id='body0'>
        <div className='sort1'>SORT BY:</div>
        <div className='sort1'>
          <button className='sort' onClick={()=>{setCoin("ALL");setPage(1)}}>HDX+SHDX+(GHDX*1.46)</button>
        </div>
        <div className='sort1'>
          <button className='sort' onClick={()=>{setCoin("SHDX");setPage(1)}}>SHDX</button>
        </div>
        <div className='sort1'>
            <button className='sort' onClick={()=>{setCoin("HDX");setPage(1)}}>HDX</button>
        </div>
        <div className='sort1'>
          <button className='sort' onClick={()=>{setCoin("GHDX");setPage(1)}}>GHDX</button>
        </div>
        <div className='prevnext'>
          <div style={{float:"left"}}>
        <button className='sort' onClick={()=>{if(page==1)return; setPage(page-1)}} >
          PREV
        </button>
      </div>
      <div style={{float:"left"}}>
        <button className='sort' onClick={()=>{setPage(page+1)}}>
          NEXT
        </button>
      </div>
        </div>
        
      </div>
        <div className="line1">
          <div className="order">RANK</div>
          <div className="addressa">ADDRESS</div>
          <div className="amount1t">HDX+SHDX+(GHDX*1.42)</div>
          <div className="amount">SHDX</div>
          <div className="amount">HDX</div>
          <div className="amount">GHDX</div>
      </div>

      <div className='bodyhdx' id='bodyhdx' >
      {
        addresss.map((element,i)=>(
          <div  className='line' key={i}>
            <div className="order">{(page -1 ) * 100 + (i+1)}</div>
            <div className='addressa'>
            <Link to={`/Address/${element.address}`}>{(element.address).toString()}</Link>
            </div>
            <div className='amount1'>{comma(Number(element.all).toFixed(2))== 0 ? "0" : comma(Number(element.all).toFixed(2))}</div>
            <div className='amount'>{comma(Number(element.shdx).toFixed(2)) == 0 ? "0" : comma(Number(element.shdx).toFixed(2))}</div>
            <div className='amount'>{comma(Number(element.hdx).toFixed(2)) == 0 ? "0" : comma(Number(element.hdx).toFixed(2))}</div>
            <div className='amount'>{comma(Number(element.ghdx).toFixed(2)) == 0 ? "0" : comma(Number(element.ghdx).toFixed(2))}</div>
          </div>
        ))
      }
      </div>

    </div>
  )
}


