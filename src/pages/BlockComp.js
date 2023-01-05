import React from 'react'
import { useParams } from "react-router-dom";
import {useEffect, useState} from 'react'
import api from '../api/index'
import axios from 'axios'
import { Outlet, Link } from "react-router-dom";
import { NavLink } from 'react-router-dom'

export default function BlockComp(){
    const [txss, setTxss] = useState([])
    const [trans, setTrans] = useState([])
    const [arr, setArr] = useState([])
    const params = useParams();
    const asdf = params.block
    const array = []
  
    useEffect( ()=>{
  
      const asyncFn = async () => {
      var addres = await api.getBlock(asdf).then(tx => {
        setArr(tx.data.data)
      });
    }
    asyncFn()
    },[]) 
    // const [add, setAdd] = useState("")
    // const params = useParams();
    // const asdf = params.address
    // // console.log(addresss)
    // // console.log(params)
    // useEffect(()=>{
    //     addresss.forEach((a)=>{
    //     if(asdf == a.address){
    //         setAdd(a);
    //         return;
    //     }
    //     })
    // },[])
    const comma = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  return (
    <>
    <div>
    {
       arr.map((element,i)=>(
         <div  className='line' key={i}>
           {/* <div className="order">{i+1}</div> */}
           <div className='amount'>{(element.BlockNo).toString()}</div>
           <Link to={`/Transactions/${element.Txhash}`}>
           <div className='Txhash'>{(element.Txhash).toString()}</div>
           </Link>
          
           <div className='DateTime'>{(element.DateTime).toString()}</div>
           <Link to={`/Addresses/${element.From}`}>
            <div className='address'>{(element.From).toString() }</div>
           </Link>
           <div className='amount'>{(element.Quantity).toString()}</div>
           <Link to={`/Addresses/${element.To}`}>
           <div className='address'>{(element.To).toString() }</div>
           </Link>
           
         </div>
       ))
     }
    </div>
      
    </>
  )
}
