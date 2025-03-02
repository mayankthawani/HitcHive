import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Captainlogout = () => {
    const navigate  =  useNavigate();
    const token = localStorage.getItem('token');
    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then((response)=>{
        console.log(response.data);
        localStorage.removeItem('token');
        navigate('/captain-login');
    })
  return (
    <div>

      
    </div>
  )
}

export default Captainlogout
