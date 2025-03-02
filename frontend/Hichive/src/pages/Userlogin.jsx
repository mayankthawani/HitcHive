



import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Userdatacontext } from '../context/Usercontext';
import axios from 'axios';

const Userlogin = () => {
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const { user, setuser } = useContext(Userdatacontext);
  const navigate = useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();
    
    const userdata = { email, password: pass };
    console.log("Sending login data:", userdata);

    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      console.log("Base URL:", BASE_URL);

      const response = await axios.post(`${BASE_URL}/users/login`, userdata, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status === 200) {
        setuser(response.data.user);
        localStorage.setItem('token', response.data.token);
        navigate("/start");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }

    setemail('');
    setpass('');
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md border-4 border-gray-300'>
        <img src='/images/hitchhive-logo.png' alt='HitchHive Logo' className='w-16 mx-auto mb-4' />
        
        <h2 className='text-2xl font-bold text-center mb-6'>Log In to Your Account</h2>
        
        <form onSubmit={submithandler}>
          <label className='block mb-2 text-gray-700'>Email</label>
          <input 
            onChange={(e) => setemail(e.target.value)} 
            type='email' 
            value={email} 
            placeholder='email@example.com' 
            required 
            className='w-full p-3 mb-4 border-2 border-gray-400 rounded bg-gray-100' 
          />
          
          <label className='block mb-2 text-gray-700'>Password</label>
          <input 
            onChange={(e) => setpass(e.target.value)} 
            value={pass} 
            type='password' 
            placeholder='********' 
            required 
            className='w-full p-3 mb-6 border-2 border-gray-400 rounded bg-gray-100' 
          />
          
          <button className='w-full bg-[#111] text-white font-semibold py-3 rounded text-lg'>Log In</button>
        </form>
        
        <p className='text-center mt-4'>New here? <Link to='/user-signup' className='text-blue-600'>Create an Account</Link></p>
      </div>
      
      <Link to='/captain-login' className='w-full max-w-md bg-green-600 text-white font-semibold py-3 text-center rounded text-lg mt-9'>Sign in as Captain</Link>
    </div>
  );
};

export default Userlogin;
