import ReactDOM from "react-dom/client";
import {useEffect, useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Addresses from "./pages/Addresses";
import Transactions from "./pages/Transactions";
import Blocks from "./pages/Blocks";
import NoPage from "./pages/NoPage";
import './App.css';
import AddressComp from "./pages/AddressComp";
import TxComp from "./pages/TxComp";
import BlockComp from "./pages/BlockComp";

export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Addresses" element={<Addresses />} />
          <Route path="Address/:address"element={<AddressComp />} />
          <Route path="Transactions" element={<Transactions />} />
          <Route path="Transaction/:tx" element={<TxComp />} />
          <Route path="Blocks" element={<Blocks />} />
          <Route path="Blocks/:block" element={<BlockComp />} />
          <Route path="*" element={<NoPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);