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
    <div className='p-4' style={{float:"left"}}>
       <div className="line1">
          <div className="addressa">ADDRESS</div>
          <div className="amount1t">HDX+SHDX+(GHDX*1.42)</div>
          <div className="amount">SHDX</div>
          <div className="amount">HDX</div>
          <div className="amount">GHDX</div>
      </div>

      <div className='bodyhdx' id='bodyhdx' >
      {
        arr.map((element,i)=>(
          <div  className='line' key={i}>
            <div className='addressa'>
            <Link to={`/Address/${element.address}`}>{(element.address).toString()}</Link>
            </div>
            <div className='amount1'>{comma(((Number(element.hdx)+Number(element.shdx)+(Number(element.ghdx)*145/100))).toFixed(2)) == 0 ? "0" : comma(((Number(element.hdx)+Number(element.shdx)+(Number(element.ghdx)*145/100))).toFixed(2))}</div>
            <div className='amount'>{comma(Number(element.shdx).toFixed(2)) == 0 ? "0" : comma(Number(element.shdx).toFixed(2))}</div>
            <div className='amount'>{comma(Number(element.hdx).toFixed(2)) == 0 ? "0" : comma(Number(element.hdx).toFixed(2))}</div>
            <div className='amount'>{comma(Number(element.ghdx).toFixed(2)) == 0 ? "0" : comma(Number(element.ghdx).toFixed(2))}</div>
          </div>
        ))
      }
      </div>
    <div  style={{marginTop:"50px", float:"left"}}>
    <div className="line1">
            <div className="amount">BlockNo</div>
            <div className="Txhash">Txhash</div>
            <div className="DateTime">DateTime</div>
            <div className="address">From</div>
            <div className="amount">Quantity</div>
            <div className="address">To</div>
          </div>
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
              <div className='address'> {(element.From).toString().substr(0,11) +"....." +(element.From).toString().substr(-11,11)}</div>
              </a>
             <div className='amount'>{(element.Quantity).toFixed(2)}</div>
             <a href={`/Address/${element.To}`}>
              <div className='address'> {(element.To).toString().substr(0,11) +"....." +(element.To).toString().substr(-11,11)}</div>
              </a>
           </div>
      ))
    }
    </div>
    </div>
    </>
  )
}
