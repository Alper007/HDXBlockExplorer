import { Outlet, Link } from "react-router-dom";
import '../App.css';
import {useEffect, useState} from 'react'
import { useNavigate ,useHistory, useLocation } from 'react-router-dom' 

const Layout = () => {
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

  return (
    <>
    <div className="App">
       <div className='Navbar' >
        <div className='hydranet1'>
          <a className='hydranet' href='/'>
            HYDRANET 
          </a>
          <img className='hdxlogo'src='https://i.hizliresim.com/ocna173.png'/>
        </div>
        <div className='tabs'>
            <a className='tab' href='/'>
              HOME
            </a>
            <a className='tab' href='/Addresses'>
            ADDRESSES
            </a>
            <a className='tab' href='/Transactions'>
            TRANSACTIONS
            </a>
            <a className='tab' href='/Blocks'>
            BLOCKS
            </a>
          <input className='inputnav' placeholder='Address,Block,Transaction' value={value} onChange={(e)=>setValue(e.target.value.trim())}></input>
          <button className='buttonnav' onClick={()=>search(value)}>SEARCH </button>
        </div>
      </div>
      <Outlet />
    </div>
      
    </>
  )
};

export default Layout;