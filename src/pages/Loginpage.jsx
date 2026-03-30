import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import logo from '../assets/logo.png'
import { RiLockPasswordLine } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";

const Loginpage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (form.username === 'admin' && form.password === 'admin123') {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password!');
    }
  };

  return (
    <div className='login-wrapper'>
      <div className='login-card'>

        {/* LOGO */}
        <div className='login-logo'>
          <img src={logo} alt="Logo" />
        </div>

        {/* TITLE */}
        <h2 className='login-title'>ADMIN PANEL</h2>
        <p className='login-sub'>Control panel login</p>

        {/* INPUTS */}
        <div className='login-fields'>
          <div className='login-input-row'>
            <span><IoPerson /></span>
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>
          <div className='login-input-row'>
            <span><RiLockPasswordLine /></span>
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {/* ERROR */}
          {error && <p className='login-error'>{error}</p>}
        </div>

        {/* WAVE + BUTTON */}
        <div className='login-bottom'>
         
          <button className='login-btn' onClick={handleLogin}>
            Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default Loginpage;