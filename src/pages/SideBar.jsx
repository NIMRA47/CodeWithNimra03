import React from 'react'
import '../App.css'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
const SideBar = ({ show }) => {
  return (
    <div className={show ? 'sidebar active' : 'sidebar'}>
      <img src={logo} alt="Logo" className='logo' />
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/Products">Products</Link></li>
        <li><Link to="/orders">Orders</Link></li>
      </ul>
    </div>
  )
}

export default SideBar