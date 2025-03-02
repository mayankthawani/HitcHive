import React, { useState , useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Userdatacontext} from '../context/Usercontext.jsx'


const UserSignup = () => {
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [userdata, setuserdata] = useState({});
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');

  const navigate = useNavigate();
  const {user, setuser} = React.useContext(Userdatacontext);

  const submithandler = async (e) => {
    e.preventDefault();
  
    const newuser = {
      fullname: {firstname : firstname , lastname:lastname}, // Combining first and last name
      email: email,
      password: pass,  
    };
  
    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL; // Load from env
      console.log("Base URL:", import.meta.env.VITE_BASE_URL);
      const response = await axios.post(`${BASE_URL}/users/register`, newuser, {
       headers: { 'Content-Type': 'application/json' }
});
  
      console.log(response.data);
  
      if (response.status === 201) {
        setuser(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/start");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  
    setfirstname("");
    setlastname("");
    setemail("");
    setpass("");
  };
  

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border-4 border-gray-300">
        <img src="/images/hitchhive-logo.png" alt="HitchHive Logo" className="w-16 mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-center mb-6">HitchHive Welcomes You!</h2>

        <form onSubmit={submithandler}>
          <label className="block mb-2 text-gray-700">Name</label>
          <div className="flex gap-4">
            <input onChange={(e)=>{setfirstname(e.target.value)}} type="text" placeholder="First name" value={firstname} required className="p-3 w-1/2 mb-4 border-2 border-gray-400 rounded bg-gray-100" />
            <input onChange={(e)=>{setlastname(e.target.value)}}  type="text" placeholder="Last name" value={lastname} required className="p-3 w-1/2 mb-4 border-2 border-gray-400 rounded bg-gray-100" />
          </div>

          <label className="block mb-2 text-gray-700">Email</label>
          <input
            onChange={(e) => setemail(e.target.value)}
            type="email"
            value={email}
            placeholder="email@example.com"
            required
            className="w-full p-3 mb-4 border-2 border-gray-400 rounded bg-gray-100"
          />

          <label className="block mb-2 text-gray-700">Password</label>
          <input
            onChange={(e) => setpass(e.target.value)}
            value={pass}
            type="password"
            placeholder="********"
            required
            className="w-full p-3 mb-6 border-2 border-gray-400 rounded bg-gray-100"
          />

          <button className="w-full bg-[#111] text-white font-semibold py-3 rounded text-lg">Create account</button>
        </form>

        <p className="text-center mt-4">
          Already a user? <Link to="/user-login" className="text-blue-600">Log in</Link>
        </p>
      </div>

      {/* Moves the paragraph to the bottom */}
      <p className="absolute bottom-2 text-[10px] leading-tight text-center w-full px-4">
        This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service apply</span>.
      </p>
    </div>
  );
};

export default UserSignup;
