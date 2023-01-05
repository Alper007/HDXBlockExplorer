import React from 'react'
import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react'
import api from '../api/index'
import axios from 'axios'
import { Outlet, Link } from "react-router-dom";
import { NavLink } from 'react-router-dom'

export default function AddressComp(){
    const [txss, setTxss] = useState([])
    const [trans, setTrans] = useState([])
    const [arr, setArr] = useState([])
    const params = useParams();
  
    useEffect( ()=>{
  
      const asyncFn = async () => {
      var addres = await api.getAddress(params.address).then(tx => {
        setArr(tx.data.data)
      });
      var txs = await api.getAddressTxs(params.address).then(tx => {
        setTxss(tx.data.data)
      });
    }
    asyncFn()
    },[]) 

    const comma = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  return (
    <>
      <div className="line1">
        <div className="order">RANK</div>
        <div className="address">ADDRESS</div>
        <div className="amount1t">HDX+SHDX+(GHDX*1.42)</div>
        <div className="amount">SHDX</div>
        <div className="amount">HDX</div>
        <div className="amount">GHDX</div>
      </div>
    <div>
       {
        arr.map((element,i)=>(
          <div  className='line' key={i}>
          <div className="order">{(params.page -1) * 100 + (i+1)}</div>
          <div className='address'>
          <a href={`/Address/${element.address}`}>{(element.address).toString()}</a>
          </div>
          <div className='amount1'>{comma(Number(element.all).toFixed(2)) === "" ? "0" : comma(Number(element.all).toFixed(2))}</div>
          <div className='amount'>{comma(Number(element.shdx).toFixed(2)) === "" ? "0" : comma(Number(element.shdx).toFixed(2))}</div>
          <div className='amount'>{comma(Number(element.hdx).toFixed(2)) === "" ? "0" : comma(Number(element.hdx).toFixed(2))}</div>
          <div className='amount'>{comma(Number(element.ghdx).toFixed(2)) === "" ? "0" : comma(Number(element.ghdx).toFixed(2))}</div>
        </div>
        ))
      } 
    </div>
    <div  style={{marginTop:"30px", float:"left"}}>
    {
      txss.map((element,i)=>(
        <div  className='line' key={i}>

             <Link to={`/Blocks/${element.BlockNo}`}>
              <div className='amount'>{(element.BlockNo).toString()}</div>
              </Link>
             <div className='Txhash'>
              <Link to={`/Transaction/${element.Txhash}`}>{(element.Txhash).toString().substr(0,9) +"....." +(element.Txhash).toString().substr(-9,9)}</Link>
              </div>
             <div className='DateTime'>{((element.DateTime).toString().slice( 0 , 10 ))}</div>
             <a href={`/Address/${element.From}`}>
              <div className='address'>{(element.From).toString() }</div>
              </a>
             <div className='amount'>{(element.Quantity).toFixed(2)}</div>
             <a href={`/Address/${element.To}`}>
              <div className='address'>{(element.To).toString() }</div>
              </a>
           </div>
      ))
    }
    </div>
      
    </>
  )
}
