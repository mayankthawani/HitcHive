



import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Userlogin = () => {
  const [email, setemail] = useState('');//useState is a Hook that allows you to have state variables in functional components usestate() ke andr value jo hai wo value input mai hai value ke andr
  const [pass, setpass] = useState('');
  const [userdata, setuserdata] = useState({})
  const submithandler = (e)=>{
    e.preventDefault();//form ka default setting reload ka hota hai isko rokne ke liye
    setuserdata({email:email,pass:pass});
    console.log(userdata);
    setemail('');
    setpass('');
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md border-4 border-gray-300'>
        <img src='/images/hitchhive-logo.png' alt='HitchHive Logo' className='w-16 mx-auto mb-4' />
        
        <h2 className='text-2xl font-bold text-center mb-6'>Log In to Your Account</h2>
        
        <form onSubmit={(e)=>{submithandler(e)}}>
          <label className='block mb-2 text-gray-700'>Email</label>
          <input onChange ={(e)=>{setemail(e.target.value)}} type='email' value={email} placeholder='email@example.com' required className='w-full p-3 mb-4 border-2  border-gray-400 rounded bg-gray-100' />
          
          <label className='block mb-2 text-gray-700'>Password</label>
          <input onChange ={(e)=>{setpass(e.target.value)}} value={pass} type='password' placeholder='********' required className='w-full p-3 mb-6 border-2 border-gray-400 rounded bg-gray-100' />
          
          <button className='w-full bg-[#111] text-white font-semibold py-3 rounded text-lg'>Log In</button>
        </form>
        
        <p className='text-center mt-4'>New here? <Link to='/user-signup' className='text-blue-600'>Create an Account</Link></p>
      </div>
      
      <Link to='/captain-login' className='w-full max-w-md bg-green-600 text-white font-semibold py-3 text-center rounded text-lg mt-9'>Sign in as Captain</Link>
    </div>
  );
};

export default Userlogin;



