import React, { useState } from 'react'
import '../App.css'
import SideBar from './SideBar'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import Orders from './Orders';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import { GiHamburgerMenu } from "react-icons/gi";

const Dashboard = () => {
  const [shownav, setnav] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="header-left">
          <GiHamburgerMenu onClick={() => setnav(!shownav)} />
          <div className="header-title">
            <span className="overview-label">OVERVIEW</span>
            <h1><span className="white">Admin </span><span className="blue">Dashboard</span></h1>
          </div>
           <div className="header-search">
            <span className='sp'>🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')}>✕</button>
            )}
          </div>
        </div>

        {/* RIGHT SIDE OF HEADER */}
        <div className="header-right">
         
          <button className="add-btn" onClick={() => navigate('addproduct')}>
            + Add Product
          </button>
        </div>
      </header>

      <SideBar show={shownav} />

      <div className='main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='products' element={<Products search={search} />} />  {/* ← pass search */}
          <Route path='orders' element={<Orders />} />
          <Route path='addproduct' element={<AddProduct />} />
          <Route path='editproduct/:id' element={<EditProduct />} />
        </Routes>
      </div>
    </>
  );
}

export default Dashboard;