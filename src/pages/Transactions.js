import React from 'react'
import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react'
import { Outlet, Link } from "react-router-dom";
import axios from 'axios'
import api from '../api/index'

export default function Transactions() {

  const [txss, setTxss] = useState([])
  const [trans, setTrans] = useState([])
  const [page,setPage] = useState(1)

  


  useEffect( ()=>{
  Fn()
  },[txss]) 
  
 const Fn =  () => {
    api.getTxs(page).then(txd => {
      setTxss(txd.data.data)
    });
  }
  var date = Date.now();


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
       

       {
         txss.map((element,i)=>(
           <div  className='line' key={i}>
             <div className="order">{(page -1 ) * 100 + (i+1)}</div>
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
       }<div style={{float:"left"}}>
        <button className='tabs' onClick={()=>{if(page==1)return; setPage(page-1)}} >
          PREV
        </button>
        </div>
        <div style={{float:"left"}}>
          <button className='tabs' onClick={()=>{setPage(page+1)}}>
            NEXT
          </button>
        </div>
     </div>
    )

}