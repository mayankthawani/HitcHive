

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen  flex flex-col justify-between bg-cover bg-center w-full" style={{
      backgroundImage: "url('/images/hitchhive-logo.png')", // Ensure correct path
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
      {/* Logo Section */}
      <div className="pt-5 px-8">
        <img className='w-20 md:w-28' src="/images/hitchhive-logo.png" alt="HitchHive Logo" />
      </div>
      
      {/* Content Section */}
      <div className='bg-slate-200 pb-7 py-5 px-6 w-full max-w-md mx-auto rounded-t-lg shadow-lg text-center'>
        <h2 className='text-2xl md:text-3xl font-bold'>Get Started with HitchHive</h2>
        <Link to = '/user-login' className='w-full flex justify-center bg-black text-white py-3 rounded mt-5 text-lg font-semibold hover:bg-gray-800 transition duration-300'>
          Continue
        </Link>
      </div>
    </div>
  );
}

export default Home;

