import React from 'react'
import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react'
import axios from 'axios'
import api from '../api/index'
import { Outlet, Link } from "react-router-dom";

export default function TxComp(){
  const [txss, setTxss] = useState([])
  const [trans, setTrans] = useState([])
  const params = useParams();
  const asdf = params.tx
  const array = []

  useEffect( ()=>{

    const asyncFn = async () => {
    var addres = await api.getTx(asdf).then(txd => {
      setTxss(txd.data.data)
    });
  }
  asyncFn()
  },[])

    const comma = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
      <div className='p-4'>
       <div className="line1">
         <div className="amount">BlockNo</div>
         <div className="Txhash">Txhash</div>
         <div className="DateTime">DateTime</div>
         <div className="address">From</div>
         <div className="amount">Quantity</div>
         <div className="address">To</div>
     </div>
     <div className='bodyhdx' id='bodyhdx' >
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
        <Link to={`/Address/${element.From}`}>
         <div className='address'>{(element.From).toString() }</div>
         </Link>
        <div className='amount'>{(element.Quantity).toFixed(2)}</div>
        <Link to={`/Address/${element.To}`}>
         <div className='address'>{(element.To).toString() }</div>
         </Link>
      </div>
       ))
     }
     </div>
   </div>
  )
}
