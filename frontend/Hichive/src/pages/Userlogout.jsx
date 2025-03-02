 import React from 'react'
 import axios from 'axios';
 import { useNavigate } from 'react-router-dom';

 
 const Userlogout = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response)=>{
        console.log(response.data);
        localStorage.removeItem('token');
        navigate('/user-login');
    })

   return (
     <div>
       
     </div>
   )
 }
 
 export default Userlogout
 